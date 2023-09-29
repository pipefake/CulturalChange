import React from 'react';
import './MemoBlock.css';
import simboloneutro from '../simbolos/simboloneutro.png';

const MemoBlock = ({ animating, handleMemoClick, memoBlock }) => (
    <div
        className="memo-block"
        onClick={() => (!memoBlock.flipped && !animating) && handleMemoClick(memoBlock)}
    >
        <div className={`memo-block-inner ${memoBlock.flipped && 'memo-block-flipped'}`}>
            <div className="memo-block-front">
                <img className='simobolos' src={simboloneutro}></img>
            </div>
            <div className="memo-block-back">
                <img className='simobolos' src={memoBlock.image} alt="Memo Block" />
            </div>
        </div>
    </div>
);

export default MemoBlock;
