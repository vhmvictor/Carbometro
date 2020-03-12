import React, { useState } from 'react';
import './ModalItem.css'

import { Button, Modal } from 'react-bootstrap';
import { TabContent, TabPane, Nav, NavItem } from 'reactstrap';
import classnames from 'classnames';

export function ModalItem({
    show,
    handleClose,
    handleSubmitParams,
    onChangeBor,
    onChangeW,
    onChangeH,
    onChangeS,
    onChangeT,
    onChangeB,
    onChangeL,
    onChangeA,
    onChangeD,
    born,
    weight,
    height,
    sexo,
    typeDm,
    breakfastCHO,
    lunchCHO,
    afternoonSnackCHO,
    dinnerCHO
}) {
    const [activeTab, setActiveTab] = useState('1'); //seta tab inicial a primeira

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab); //função para alternar entre as tabs
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
                                <div>
                                    <label>
                                        Data nasc:
                                        <input
                                            placeholder="dd/mm/aaaa"
                                            className="ModalItem-Field"
                                            name="born"
                                            id="born"
                                            required value={born}
                                            onChange={onChangeBor}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Peso:
                                        <input
                                            placeholder="kg"
                                            className="ModalItem-Field"
                                            name="weight"
                                            id="weight"
                                            required value={weight}
                                            onChange={onChangeW}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Altura:
                                        <input
                                            placeholder="exemplo - 1.80"
                                            className="ModalItem-Field"
                                            name="height"
                                            id="height"
                                            required value={height}
                                            onChange={onChangeH}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Sexo:
                                        <select className="ModalItem-Field" value={sexo} onChange={onChangeS}>
                                            <option value=""> Selecione </option>
                                            <option value="masculino"> Masculino </option>
                                            <option value="feminino"> Feminino </option>
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Tipo de diabetes:
                                        <select className="ModalItem-Field" value={typeDm} onChange={onChangeT}>
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
                                <div>
                                    <label>
                                        Café da manhã (Bolus):
                                        <input
                                            placeholder="relação insulina/CHO"
                                            className="ModalItem-Field"
                                            name="breakfastCHO"
                                            id="breakfastCHO"
                                            required value={breakfastCHO}
                                            onChange={onChangeB}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Almoço (Bolus):
                                        <input
                                            placeholder="relação insulina/CHO"
                                            className="ModalItem-Field"
                                            name="lunchCHO"
                                            id="lunchCHO"
                                            required value={lunchCHO}
                                            onChange={onChangeL}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Lanche da tarde (Bolus):
                                        <input
                                            placeholder="relação insulina/CHO"
                                            className="ModalItem-Field"
                                            name="afternoonSnackCHO"
                                            id="afternoonSnackCHO"
                                            required value={afternoonSnackCHO}
                                            onChange={onChangeA}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Jantar (Bolus):
                                        <input
                                            placeholder="relação insulina/CHO"
                                            className="ModalItem-Field"
                                            name="dinnerCHO"
                                            id="dinnerCHO"
                                            required value={dinnerCHO}
                                            onChange={onChangeD}
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