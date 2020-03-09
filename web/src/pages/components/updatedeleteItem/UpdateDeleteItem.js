import React, { useState } from 'react';

import './UpdateDeleteItem.css'

export function UpdateDeleteItem({ glucose, handleUpdateBlood, handleDeleteBlood }) {
    const [editando, setEditando] = useState(false);
    const [value, setValue] = useState(glucose.value);

    const handleEdit = () => {

        if (editando && glucose.value !== value) {
            handleUpdateBlood(value, glucose._id);
        }
        setEditando(prevStateEdit => !prevStateEdit);
    };

    const handleDelete = () => {
        handleDeleteBlood(glucose._id)
    };

    return (
        <div className="Show-Glucoses-Value">
            <strong>
                {editando ? (
                    <input className="input-btn"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                ) : (
                        <strong>{glucose.value}</strong>
                    )}
                {!editando ? (
                    <button className="btn-edit" onClick={() => handleEdit()}>
                        <i className="fas fa-pen"></i> 
                    </button>
                ):(
                    <button className="btn-save" onClick={() => handleEdit()}>
                        <i className="fas fa-check"></i> 
                    </button>
                )}
                <button className="btn-delete" onClick={() => handleDelete()}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </strong>
        </div>
    )
}
