import React, { useState } from 'react';
import './ModalItem.css'

import { Button, Modal } from 'react-bootstrap';
import { TabContent, TabPane, Nav, NavItem } from 'reactstrap';
import classnames from 'classnames';
import api from '../../../services/api';
import { getId } from '../../../services/auth';

export function ModalItem ({ show, setShow, handleClose }) {

    const [breakfastCHO, setBreakfastCHO] = useState('');
    const [lunchCHO, setLunchCHO] = useState('');
    const [afternoonSnackCHO, setAfternoonSnackCHO] = useState('');
    const [dinnerCHO, setDinnerCHO] = useState('');
    const [born, setBorn] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [sexo, setSexo] = useState('');
    const [typeDm, setTypeDm] = useState('');
    const [fc, setFc] = useState('');
    const [glucoseTarget, setGlucoseTarget] = useState('');
    const [minTargetRange, setMinTargetRange] = useState('');
    const [maxTargetRange, setMaxTargetRange] = useState('');
    const [activeTab, setActiveTab] = useState('1'); //seta tab inicial a primeira

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab); //função para alternar entre as tabs
    }

    async function handleSubmitParams(e) {
        e.preventDefault()

        const id = getId();

        await api.post(`/user/${id}/add_params`,
            {
                breakfastCHO,
                lunchCHO,
                afternoonSnackCHO,
                dinnerCHO,
                born,
                weight,
                height,
                sexo,
                typeDm,
                fc,
                glucoseTarget,
                minTargetRange,
                maxTargetRange
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })

        setShow(false)
    }

    return (
        <>
            <Modal className="Modal" show={show} onHide={handleClose}>
                <Modal.Header className="Modal-header">
                    <Modal.Title>
                        <Nav tabs>
                            <NavItem className="Tabs">
                                <button
                                    className={classnames({ active: activeTab === '1' }, "Tabs-btn")}
                                    onClick={() => { toggle('1'); }}
                                >
                                    Dados pessoais
                                </button>
                            </NavItem>
                            <NavItem className="Tabs">
                                <button
                                    className={classnames({ active: activeTab === '2' }, "Tabs-btn")}
                                    onClick={() => { toggle('2'); }}
                                >
                                    Bolus
                                </button>
                            </NavItem>
                        </Nav>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="Modal-body">
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <h4 className="textModal" >Insira seus dados pessoais</h4>
                            <form onSubmit={handleSubmitParams}>
                                <div className="ModalLabel">
                                    <label>
                                        Data nasc:
                                        <input
                                            placeholder="dd/mm/aaaa"
                                            className="ModalItem-Field"
                                            name="born"
                                            id="born"
                                            required value={born}
                                            onChange={(e) => setBorn(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="ModalLabel">
                                    <label>
                                        Peso:
                                        <input
                                            placeholder="kg"
                                            className="ModalItem-Field"
                                            name="weight"
                                            id="weight"
                                            required value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="ModalLabel">
                                    <label>
                                        Altura:
                                        <input
                                            placeholder="exemplo - 1.80"
                                            className="ModalItem-Field"
                                            name="height"
                                            id="height"
                                            required value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="ModalLabel">
                                    <label>
                                        Sexo:
                                        <select className="ModalItem-Field" value={sexo} onChange={(e) => setSexo(e.target.value)}>
                                            <option value=""> Selecione </option>
                                            <option value="masculino"> Masculino </option>
                                            <option value="feminino"> Feminino </option>
                                        </select>
                                    </label>
                                </div>
                                <div className="ModalLabel">
                                    <label>
                                        Tipo de diabetes:
                                        <select className="ModalItem-Field" value={typeDm} onChange={(e) => setTypeDm(e.target.value)}>
                                            <option value=""> Selecione </option>
                                            <option value="dm1"> Tipo 1 </option>
                                            <option value="dm2"> Tipo 2 </option>
                                            <option value="dmlada"> Tipo Lada </option>
                                            <option value="dmgestacional"> Gestacional </option>
                                        </select>
                                    </label>
                                </div>
                            </form>
                        </TabPane>
                        <TabPane tabId="2">
                        <h4 className="textModal" >Insira seus parâmetros para Bolus</h4>
                            <form onSubmit={handleSubmitParams}>
                                <div className="ModalLabel">
                                    <label>
                                        Café da manhã (Bolus):
                                        <input
                                            placeholder="relação insulina/CHO"
                                            className="ModalItem-Field"
                                            name="breakfastCHO"
                                            id="breakfastCHO"
                                            required value={breakfastCHO}
                                            onChange={(e) => setBreakfastCHO(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="ModalLabel">
                                    <label>
                                        Almoço (Bolus):
                                        <input
                                            placeholder="relação insulina/CHO"
                                            className="ModalItem-Field"
                                            name="lunchCHO"
                                            id="lunchCHO"
                                            required value={lunchCHO}
                                            onChange={(e) => setLunchCHO(e.target.value)}
                                        />
                                    </label>
                                </div> 
                                <div className="ModalLabel">
                                    <label>
                                        Lanche da tarde (Bolus):
                                        <input
                                            placeholder="relação insulina/CHO"
                                            className="ModalItem-Field"
                                            name="afternoonSnackCHO"
                                            id="afternoonSnackCHO"
                                            required value={afternoonSnackCHO}
                                            onChange={(e) => setAfternoonSnackCHO(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="ModalLabel">
                                    <label>
                                        Jantar (Bolus):
                                        <input
                                            placeholder="relação insulina/CHO"
                                            className="ModalItem-Field"
                                            name="dinnerCHO"
                                            id="dinnerCHO"
                                            required value={dinnerCHO}
                                            onChange={(e) => setDinnerCHO(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="ModalLabel">
                                    <label>
                                        Fator de correção:
                                        <input
                                            placeholder="fator de correção"
                                            className="ModalItem-Field"
                                            name="fator de correção"
                                            id="fator de correção"
                                            required value={fc}
                                            onChange={(e) => setFc(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="ModalLabel">
                                    <label>
                                        Glicemia alvo:
                                        <input
                                            placeholder="glicemia alvo"
                                            className="ModalItem-Field"
                                            name="glucoseTarget"
                                            id="glucoseTarget"
                                            required value={glucoseTarget}
                                            onChange={(e) => setGlucoseTarget(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="ModalLabel">
                                    <label>
                                        Faixa de glicemia alvo:
                                        <input
                                            placeholder="De"
                                            className="ModalItem-Field"
                                            name="minTargetRange"
                                            id="minTargetRange"
                                            required value={minTargetRange}
                                            onChange={(e) => setMinTargetRange(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="ModalLabel">
                                    <label>
                                        <input
                                            placeholder="Até"
                                            className="ModalItem-Field"
                                            name="maxTargetRange"
                                            id="maxTargetRange"
                                            required value={maxTargetRange}
                                            onChange={(e) => setMaxTargetRange(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <button className="ModalSave-Btn" type="submit">Salvar</button>
                            </form>
                        </TabPane>
                    </TabContent>
                </Modal.Body>
                <Modal.Footer className="Modal-footer">
                    <Button variant="danger" onClick={handleClose} > Cancelar </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}