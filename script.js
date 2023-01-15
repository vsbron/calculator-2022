"use strict";

// Calculator
const calculator = function () {
  //// Selecting elements
  const number1 = document.querySelector(".number1");
  const operationSign = document.querySelector(".operation-sign");
  const number2 = document.querySelector(".number2");
  const screen = document.querySelector(".bigger-line");
  const keys = document.querySelectorAll(".key");

  const key0 = document.querySelector(".key0");
  const key1 = document.querySelector(".key1");
  const key2 = document.querySelector(".key2");
  const key3 = document.querySelector(".key3");
  const key4 = document.querySelector(".key4");
  const key5 = document.querySelector(".key5");
  const key6 = document.querySelector(".key6");
  const key7 = document.querySelector(".key7");
  const key8 = document.querySelector(".key8");
  const key9 = document.querySelector(".key9");
  const keyDot = document.querySelector(".keyDot");
  const keyBackspace = document.querySelector(".key-backspace");
  const keyClear = document.querySelector(".key-clear");
  const keyEquals = document.querySelector(".key-equals");

  const keyPlus = document.querySelector(".key-plus");
  const keyMinus = document.querySelector(".key-minus");
  const keyMultiply = document.querySelector(".key-multiply");
  const keyDivide = document.querySelector(".key-divide");

  let isSecondNumber = false;
  let isDecimal = false;
  let afterEquals = false;
  let currentOperation;

  //// Writing functions basic functions

  // Deleting input line
  const deleteInput = function () {
    screen.innerHTML = 0;
    isDecimal = false;
  };

  // Deleting all
  const deleteAll = function () {
    deleteInput();
    number1.innerHTML = operationSign.innerHTML = number2.innerHTML = "";
    isSecondNumber = false;
    afterEquals = false;
  };

  // Math operations
  const operationPlus = (a, b) => a + b;
  const operationMinus = (a, b) => a - b;
  const operationMultiply = (a, b) => a * b;
  const operationDivide = (a, b) => a / b;
  const operationSquare = (a) => Math.sqrt(a);
  const operationPower = (a, b) => a ** b;
  const operation1Divide = (a) => 1 / a;

  // Setting the math operation
  const setOperation = function (key) {
    switch (key.innerHTML) {
      case "+":
        currentOperation = operationPlus;
        break;
      case "-":
        currentOperation = operationMinus;
        break;
      case "×":
        currentOperation = operationMultiply;
        break;
      case "÷":
        currentOperation = operationDivide;
        break;
    }
    // Update operation sign on small screen
    operationSign.innerHTML = key.innerHTML;
  };

  const keyPressed = function (key) {
    // Animating key on press
    key.classList.add("pressed");
    const unpress = () => key.classList.remove("pressed");
    setTimeout(unpress, 100);

    // Checking the length of number (shouldn't be longer than 15)
    if (screen.innerHTML.length == 15 && key.classList.contains("key-number"))
      return;

    // Clearing the input on the big screen
    if (key.classList.contains("key-backspace")) {
      deleteInput();
    }

    // Resetting the calculator
    if (key.classList.contains("key-clear")) {
      deleteAll();
    }

    // Checking if entering number
    if (key.classList.contains("key-number")) {
      // Clearing the screen if new expression
      if (afterEquals) {
        deleteAll();
      }

      // Checking if dot key pressed
      if (key.classList.contains("keyDot")) {
        if (isDecimal) {
          return; // If pressed before - return
        }
        isDecimal = true; // If not - continue
      }

      // If not entering decimal, remove 0 as first char
      if (screen.innerHTML === "0" && !key.classList.contains("keyDot"))
        screen.innerHTML = "";

      // Add number to the screen
      screen.innerHTML += key.innerHTML;
    }

    // Checking if operation key is pressed
    if (key.classList.contains("key-operations-basic")) {
      // If operation was pressed after second number, calculate output and continue on
      if (isSecondNumber) {
        number1.innerHTML = currentOperation(
          +number1.innerHTML,
          +screen.innerHTML
        );
        setOperation(key); // Set operation method
        deleteInput(); // Clear input on big screen
        return; // Return
      }
      // Move numbers to number 1
      number1.innerHTML = screen.innerHTML;

      // If sign pressed after Equals
      if (afterEquals) {
        number2.innerHTML = ""; // Clear number2
        afterEquals = false;
        isSecondNumber = false;
      }
      isSecondNumber = true;
      deleteInput();
      setOperation(key);
    }

    // If Equals is pressed
    if (key.classList.contains("key-equals")) {
      if (!isSecondNumber) return; // Return if entering number1
      number2.innerHTML = screen.innerHTML; // Update number2

      // Print the outcome on a big screen
      screen.innerHTML = currentOperation(
        +number1.innerHTML,
        +number2.innerHTML
      );
      isSecondNumber = false;
      afterEquals = true;
    }
  };

  const keyboardKey = function (e) {
    const key = e.key;
    if (key === "0") keyPressed(key0);
    if (key === "1") keyPressed(key1);
    if (key === "2") keyPressed(key2);
    if (key === "3") keyPressed(key3);
    if (key === "4") keyPressed(key4);
    if (key === "5") keyPressed(key5);
    if (key === "6") keyPressed(key6);
    if (key === "7") keyPressed(key7);
    if (key === "8") keyPressed(key8);
    if (key === "9") keyPressed(key9);
    if (key === ".") keyPressed(keyDot);

    if (key === "+") keyPressed(keyPlus);
    if (key === "-") keyPressed(keyMinus);
    if (key === "*") keyPressed(keyMultiply);
    if (key === "/") keyPressed(keyDivide);

    if (key === "Enter" || key === "=") keyPressed(keyEquals);
    if (key === "Escape") keyPressed(keyClear);
    if (key === "Backspace" || key === "Delete") keyPressed(keyBackspace);
  };

  //// Event handlers
  keys.forEach((key) =>
    key.addEventListener("click", function () {
      keyPressed(key);
    })
  );
  document.addEventListener("keydown", keyboardKey);
};
