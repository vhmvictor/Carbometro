import React, { useState, useEffect } from 'react'
import api from '../../../services/api';
import { getId } from '../../../services/auth';
import { Button, Modal } from 'react-bootstrap';

import './AddItem.css'

export function AddItem({ glucose }) {

    console.log(glucose.value)

    const [users, setUsers] = useState([]); //controle usuários
    const [value, setValue] = useState(glucose.value);
    //const [foods, setFoods] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [listFoodsSelect, setListFoodsSelect] = useState([]);
    const [addGram, setAddGram] = useState('');

    const [arrayGram, setArrayGram] = useState([]);
    const [arrayCalCho, setArrayCalcCho] = useState([]);
    const [totalCho, setTotalCho] = useState('');
    const [foodType, setFoodType] = useState('');

    const [filter, setFilter] = useState('');
    const [list, setList] = useState([]);

    const [refeicoes, setRefeicoes] = useState({});

    async function loadFoods() {
        await api.get('/food')
            .then(responseData => {
                console.log(responseData.data)
                setList(responseData.data)
            })
    }

    useEffect(() => {

        setList(
            list.map((d) => {
                return {
                    select: false,
                    name: d.name,
                    measure: d.measure,
                    unitGram: d.unitGram,
                    cho: d.cho
                }
            })
        )

        loadFoods();
        // eslint-disable-next-line
    }, []); 

    useEffect(() => {
        console.log(listFoodsSelect)
        // eslint-disable-next-line
    }, [listFoodsSelect])
    
   
    useEffect(() => {
        console.group('REFEIÇÕES');
        console.log(refeicoes);
        console.groupEnd();
        // eslint-disable-next-line
    }, [refeicoes])
    
    useEffect(() => {
        console.log(arrayGram);
        console.log(arrayCalCho)
        SomateCho(arrayCalCho)
        // eslint-disable-next-line
    }, [arrayCalCho])

    function saveFood() {

        setArrayGram(prevState => [...prevState, parseInt(addGram)]);//adicionando 'addGram' na última posição do vetor(forma correta para state)

        const lastPositionArray = listFoodsSelect.length - 1; 
        const lastFoodSelect = listFoodsSelect[lastPositionArray];
        const choCal = (( addGram * lastFoodSelect.cho ) / lastFoodSelect.unitGram );
        
        setArrayCalcCho(prevState => [...prevState, choCal]); //adicionando 'choCal' na última posição do vetor(forma correta para state)

        setRefeicoes(prevState => { //seta novo alimento (objeto) ao array da refeição
            return {
                ...prevState, // todos alimentos (objeto) já adicionado e incrementa um novo... 
                [lastFoodSelect._id]: {
                    select: false, // condicional para adicionar o novo item selecioando ao  mesmo Id do array de objetos (mesma refeição)
                    name: lastFoodSelect.name, 
                    measure: lastFoodSelect.measure, 
                    addGram, 
                    choCal
                }
            }
        })

        setAddGram('')
        handleClose()
       
    }

    async function removeSelectItemId(arrayItem, id, arrayChoParam) {
        const result = arrayItem.filter(function(el) {
          return el._id === id;
        });
        
        for (const elemento of result) {
            const index = arrayItem.indexOf(elemento);    
            arrayItem.splice(index, 1);
            arrayChoParam.splice(index, 1);
            setRefeicoes(prevState => { //pega o ultimo estado do array de refeições para deletar do array de selecionados
                const newState = JSON.parse(JSON.stringify(prevState)); //formato para conversão a JSON(para o BD entender os dados)
                delete newState[elemento._id]; // 
                return newState;
            });
        }

        console.log(arrayItem)
        console.log(arrayChoParam)

        SomateCho(arrayChoParam)

        return {arrayItem, arrayChoParam};
    }

    async function SomateCho(array) {
        
        const result = array.reduce((x, y) => x + y,0)
        console.log('total cho select:  ' + result)
        setTotalCho(result);
        return result

    }

    async function handleAddNewFood(e) {
        e.preventDefault();
        
        const id = getId();

        await api.post(`/user/${id}/add_newFood`, {
            value,
            totalCho,
            foodType,
            refeicoes: Object.values(refeicoes) //envia os objetos do array de refeições 
        })
            .then(response => {
                setUsers([...users, response.data]); //controle de acesso
                console.log(response.data)

            })
            .catch(error => {
                console.log(error)
            })

        setValue('');
        setTotalCho('');
        setFoodType('');
        setRefeicoes('');
        setFilter('');
        setListFoodsSelect('')
        setArrayGram([])
        setArrayCalcCho([])
        window.location.reload(false);
        
    }

    return (
        <>
            <div className="AddItem-title">
                <h1>Adicionar nova refeição</h1>
            </div>
            <form onSubmit={handleAddNewFood}>
                <div className="AddItem-body">
                    <label>
                        Tipo da Refeição:
                        <select className="AddItem-Field" required value={foodType} onChange={e => setFoodType(e.target.value)}>
                            <option value=""> Selecione </option>
                            <option value="breakfastCHO"> Café da Manhã </option>
                            <option value="lunchCHO"> Almoço </option>
                            <option value="afternoonSnackCHO"> Lanche da Tarde </option>
                            <option value="dinnerCHO"> Jantar </option>
                        </select>
                    </label>
                </div>
                <div className="AddItem-body">
                    <label>
                        Insira a Glicemia atual:
                        <input
                            placeholder="Insira uma nova Glicemia *"
                            className="AddItem-Field"
                            name="blood_glucoses"
                            id="blood_glucoses"
                            required value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </label>
                </div>
                <div className="AddItem-body">
                    <label>
                        Buscar alimento:
                        <input
                            placeholder="informe um alimento..."
                            className="AddItem-Field"
                            name="food"
                            id="food"
                            required value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </label>
                </div>
                <div className="AddGlucose">
                    <button className="AddGlucose-Btn" type="submit">Adicionar refeição</button>
                </div>
            </form>
            {filter ? (
                <div className="Table">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}></th>
                                <th style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>Nome</th>
                                <th style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>Medida</th>
                                <th style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>g ou ml</th>
                                <th style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>CHO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map(food => {
                                    if (filter.length !== 0) {
                                        const name = food.name;
                                        if (name.toLowerCase().startsWith(filter.toLowerCase())) {
                                            return (
                                                <tr key={food._id} style={{ textAlign: 'center', backgroundColor: 'rgba(223, 221, 221, 0.959)' }}>
                                                    <th scope="row">
                                                        <input onChange={(event) => {
                                                            let checked = event.target.checked
                                                            setList(
                                                                list.map((data) => {
                                                                    if (food._id === data._id) {
                                                                        data.select = checked
                                                                        console.log('selecionado:  ' + data.select)
                                                                        if(data.select === true) {
                                                                            setListFoodsSelect(prevState => [...prevState, data]);
                                                                            handleShow()
                                                                        }
                                                                        else if(data.select === false){
                                                                            removeSelectItemId(listFoodsSelect, data._id, arrayCalCho);
                                                    
                                                                        }
                                                                        
                                                                        
                                                                    }
                                                                    return data;
                                                                }))
                                                        }} type="checkbox" checked={food.select} />
                                                    </th>
                                                    <td>{food.name}</td>
                                                    <td>{food.measure}</td>
                                                    <td>{food.unitGram}</td>
                                                    <td>{food.cho}</td>
                                                </tr>
                                            )
                                        } else {
                                            return null;
                                        }
                                    }
                                    return null
                                })
                            }
                        </tbody>
                    </table>
                </div>
            ) : ('')}
            <Modal className="Modal" show={show} onHide={handleClose}>
                <Modal.Header className="Modal-header">
                    <Modal.Title>
                        titulo
                    </Modal.Title>
                </Modal.Header>
                    <Modal.Body className="Modal-body">
                                    <div className="ModalLabel">
                                        <label>
                                            Quantidade que irá consumir(g)
                                            <input
                                                placeholder="g ou ml"
                                                className="ModalItem-Field"
                                                name="setEdit"
                                                type="numeric"
                                                required value={addGram}
                                                onChange={(e) => setAddGram(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <button className="ModalSave-Btn" onClick={saveFood}>Salvar</button>
                    </Modal.Body>
                <Modal.Footer className="Modal-footer">
                    <Button variant="danger" onClick={handleClose} > Cancelar </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}