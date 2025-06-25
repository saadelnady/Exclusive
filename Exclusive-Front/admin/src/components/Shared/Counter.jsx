const Counter = ({ counter, decreaseHandler, increaseHandler }) => {
  return (
    <div className="counter">
      <button className="decrease" onClick={decreaseHandler}>
        -
      </button>
      <span className="amount">{counter}</span>
      <button className="increase" onClick={increaseHandler}>
        +
      </button>
    </div>
  );
};

export default Counter;
