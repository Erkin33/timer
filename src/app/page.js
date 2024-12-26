"use client";

import React, { useRef, useState, useEffect } from "react";
import '../styles/globals.css';

export default function Home() {
  const [time, setTime] = useState(0); // Время в секундах
  const [remainingTime, setRemainingTime] = useState(0); // Оставшееся время
  const [isRunning, setIsRunning] = useState(false); // Флаг запуска таймера
  const size = useRef(null); // Реф для полоски

  useEffect(() => {
    let timer;
    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer); // Очистка таймера
  }, [isRunning, remainingTime]);

  useEffect(() => {
    if (size.current && time > 0) {
      const percentage = (remainingTime / time) * 100;
      size.current.style.width = `${percentage}%`; // Обновляем ширину полоски
    }
  }, [remainingTime, time]);

  const handleStart = () => {
    if (time > 0) {
      setRemainingTime(time);
      setIsRunning(true);
    }
  };

  return (
    <div className="bg-[#3708468e] w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-between items-center w-[40%] h-[90%] p-[5%] bg-black rounded-[15px] border-[1px] border-white">
        {/* Полоска с рефом */}
        <div
          ref={size}
          className="h-[50px] bg-red-500 rounded mr-auto"
          style={{ width: "100%" }} // Начальная ширина
        ></div>

        {/* Ввод времени и запуск таймера */}
        <div className="text-center">
          <h1 className="text-white text-2xl mb-4">
            {isRunning ? `Осталось: ${remainingTime} секунд` : "Введите время"}
          </h1>
          {!isRunning && (
            <input
              type="number"
              placeholder="Введите секунды"
              className="mb-4 p-2 border rounded text-black"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
            />
          )}
          <button
            onClick={handleStart}
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={isRunning || time <= 0}
          >
            {isRunning ? "Таймер идет..." : "Старт"}
          </button>
        </div>
      </div>
    </div>
  );
}
