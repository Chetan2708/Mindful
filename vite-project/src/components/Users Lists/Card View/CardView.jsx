// CardView.jsx
import React from 'react';
import "./CardDetails.css"
import CardComponent from './CardComponent';

const CardView = ({ data, handleEdit, handleDelete, handleView }) => {
    return (
        <div>
            {data.map((item, i) => (
                <CardComponent key={i} i={i} item={item} handleEdit={handleEdit} handleDelete={handleDelete} handleView={handleView} />
            ))}
        </div>
    );
};

export default CardView;
