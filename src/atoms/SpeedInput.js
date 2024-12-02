import React from "react";
import styled from "styled-components";

const SpeedInput = ({ speed, setSpeed, isSolved, isSolving }) => {
  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value)); // Update the speed state with the slider's value
  };

  return (
    <StyledWrapper>
      <span className="text-white me-3">Speed: {speed} ms</span>
      <label className="slider">
        <input
          type="range"
          className="level"
          disabled={isSolved||isSolving}
          min="50"
          max="500"
          step="10"
          value={speed}
          onChange={handleSpeedChange} // Update speed on slider change
        />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .slider {
    /* slider */
    --slider-width: 100%;
    --slider-height: 6px;
    --slider-bg: rgb(82, 82, 82);
    --slider-border-radius: 999px;
    /* level */
    --level-color: #fff;
    --level-transition-duration: 0.1s;
    /* icon */
    --icon-margin: 15px;
    --icon-color: var(--slider-bg);
    --icon-size: 25px;
  }

  .slider {
    cursor: pointer;
    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;
  }

  .slider .volume {
    display: inline-block;
    vertical-align: top;
    margin-right: var(--icon-margin);
    color: var(--icon-color);
    width: var(--icon-size);
    height: auto;
  }

  .slider .level {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: var(--slider-width);
    height: var(--slider-height);
    background: var(--slider-bg);
    overflow: hidden;
    border-radius: var(--slider-border-radius);
    transition: height var(--level-transition-duration);
    cursor: inherit;
  }

  .slider .level::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    height: 0;
    box-shadow: -200px 0 0 200px var(--level-color);
  }

  .slider:hover .level {
    height: calc(var(--slider-height) * 2);
  }
`;

export default SpeedInput;
