import React, { useEffect, useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import { calculateService } from '../services/CalculateServices';

const CircleInput: React.FC = () => {
  const [outerRadius, setOuterRadius] = useState<number>(0);
  const [innerRadius, setInnerRadius] = useState<number>(0);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [results, setResults] = useState<{
    circleArea: number,
    circumference: number,
    ringArea?: number,
  } | null>(null);
  const [pointInside, setPointInside] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const circleArea = calculateService.calculateCircleArea(outerRadius);
    const circumference = calculateService.calculateCircleCircumference(outerRadius);
    let ringArea = undefined;

    // if (innerRadius > 0 && innerRadius < outerRadius) {
    //     ringArea = calculateService.calculateRingArea(outerRadius, innerRadius);
    //     const isInside = calculateService.isPointInsideRing(outerRadius, innerRadius);
    //     setPointInside(isInside);
    //   } else {
    //     const isInside = calculateService.isPointInsideCircle(outerRadius);
    // }

    // Перевірка і розрахунок для кільця, якщо внутрішній радіус задано
    if (innerRadius > 0 && innerRadius < outerRadius) {
      ringArea = calculateService.calculateRingArea(outerRadius, innerRadius);
      const isInside = calculateService.isPointInsideRing(outerRadius, innerRadius, x, y);
      setPointInside(isInside);
    } else {
      // Якщо кільце не визначено, перевірка попадання точки для круга
      const isInside = calculateService.isPointInsideCircle(outerRadius, x, y);
      setPointInside(isInside);
    }

    setResults({ circleArea, circumference, ringArea });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <IonItem>
          <IonLabel position="floating">Зовнішній радіус круга/кільця</IonLabel>
          <IonInput type="number" value={outerRadius.toString()} onIonChange={e => setOuterRadius(parseFloat(e.detail.value!))} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Внутрішній радіус кільця (0 якщо круг)</IonLabel>
          <IonInput type="number" value={innerRadius.toString()} onIonChange={e => setInnerRadius(parseFloat(e.detail.value!))} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">X координата точки</IonLabel>
          <IonInput type="number" value={x.toString()} onIonChange={e => setX(parseFloat(e.detail.value!))} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Y координата точки</IonLabel>
          <IonInput type="number" value={y.toString()} onIonChange={e => setY(parseFloat(e.detail.value!))} />
        </IonItem>
        <IonButton type="submit" expand="block">Розрахувати та перевірити</IonButton>
      </form>
      {results && (
        <div>
          <IonItem>
            <IonLabel>Площа круга:</IonLabel>
            <IonText>{results.circleArea.toFixed(2)}</IonText>
          </IonItem>
          <IonItem>
            <IonLabel>Окружність круга:</IonLabel>
            <IonText>{results.circumference.toFixed(2)}</IonText>
          </IonItem>
          {results.ringArea !== undefined && (
            <IonItem>
              <IonLabel>Площа кільця:</IonLabel>
              <IonText>{results.ringArea.toFixed(2)}</IonText>
            </IonItem>
          )}
        </div>
      )}
      {pointInside !== null && (
        <IonText style={{ color: pointInside ? 'green' : 'red' }}>
          {pointInside ? 'Точка попадає' : 'Точка не попадає'}
        </IonText>
      )}
    </>
  );
};

export default CircleInput;
