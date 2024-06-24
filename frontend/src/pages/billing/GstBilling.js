import React, { useEffect } from 'react'
import "./billing.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { GetCustomers } from '../../URL/url';
import axios from "axios"




const GstBilling = () => {
  const [printMode, setPrintMode] = useState(false);
  const[state,setState]=useState({
    invoiceNumber:1,
    billFrom:"KITKAT",
    billFromGST:"33AAHH123123ZX",
    billFromAddress:'NO:525 AC ST KOVAI', 
  })
  const [rows,setRows]=useState([])

  const handleadd=()=>{
    setRows(preRow=>[...preRow,{id:preRow.length+1}])
  }

 const delRow=(id)=>{
   setRows(preRow =>preRow.filter(row=>row.id !==id))
 
 }
const calculateTotal = () => {
  let sum = 0;
  rows.forEach(row => {
    const rowTotal = row.unitValue * row.unitPrice;
    sum += isNaN(rowTotal) ? 0 : rowTotal;
  });
  return sum;
};

useEffect(() => {
  const totalValue = calculateTotal();
  setState(prevState => ({ ...prevState, subTotal: totalValue }));
}, [rows]);

const handleInputChange = (id, field, value) => {
  setRows(prevRows =>
    prevRows.map(row => (row.id === id ? { ...row, [field]: value } : row))
  );
};
const handlePrint = () => {
  window.print();
  setPrintMode(true);
};


//dropdown


const [customers, setCustomers] = useState([]);
const [firstCustomer,setFirstCustomer]=useState()

useEffect(() => {
 axios.get(GetCustomers).then((res)=>setCustomers(res.data))
}, []);
console.log(customers);


const handleDrpdown=(e)=>{
const selectedId=(e.target.value)
const selectedCustomer=customers.find((customer)=>customer._id === selectedId)
setFirstCustomer(selectedCustomer)
}
  return (
    <div className='d-flex flex-column align-items-center justify-content-center w-100'>
      <div>
      <h1 className='title'>Customer Invoice</h1>
      <hr />
      <section className='d-flex mx-3'>
        <div>
        <p>Invoice from:</p>
        <h2>{state.billFrom}</h2>
        <p>{state.billFromAddress}</p>
        <h4>GST:{state.billFromGST}</h4>
        </div>
        <div className='number_date'>
          <p><span className='fw-bold'>Invoice&nbsp;Number:&nbsp;</span>
                <span className="current-date">{state.invoiceNumber}</span></p>
          <p>
          <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                  <span className='current-date'>{new Date().toLocaleDateString()}</span>
                  </p>
        </div>
        <hr />
      </section>
      <hr />
      <section className='d-flex mx-3'>
        <div>
        <p>Billed to:</p>
        <h2>{firstCustomer ? firstCustomer.CustomerName : ""}</h2>
        <p>{firstCustomer ? firstCustomer.CustomerAddress : ""}</p>
        <p>{firstCustomer ? firstCustomer.CustomerContact : ""}</p>
        <h4>{firstCustomer ? firstCustomer.CustomerGST : ""}</h4>
        </div>
        <div className='number_date'>
          <p>Select customer</p>
              <Form.Select aria-label="Default select example" onChange={handleDrpdown}>
              <option>Select customer</option>
              {customers.map((customer)=>{
                return(
                 <>
                  <option key={customer._id} value={customer._id}>{customer.CustomerName}</option>
                  </>
                )
              })}
            </Form.Select>
           
        </div>
      </section>
     <hr />
     {!printMode && <button className="btn btn-success text-center" onClick={handleadd}>ADD</button>}
      <table class="table table-bordered table-condensed">
      <thead>
    <tr >
      <th style={{  outline: 'none' }}>S.NO</th>
      <th >Name</th>
      <th  className="col-sm-2">Quantity</th>
      <th className="col-sm-2">Unit Price</th>
       <th >Total(Rs)</th>
      {!printMode && <th>Actions</th>}
      
    </tr>
  </thead>
  <tbody style={{alignItems:"center"}}>
   
    {rows.map((row,i)=>(
      <tr key={row.id}>
        <td>{i+1}</td>
        <td><input type="text" class="form-control style"  placeholder='Description'/></td>
        <td><input type="number" class="form-control style" placeholder='0.00' onChange={(e) => handleInputChange(row.id, 'unitValue', e.target.value)}/></td>
        <td><input type="number" class="form-control style" placeholder='0.00' onChange={(e) => handleInputChange(row.id, 'unitPrice', e.target.value)}/></td>
        <td class="form-control">{isNaN(row.unitValue * row.unitPrice) ? "0.00" : (row.unitValue * row.unitPrice).toFixed(2)}</td>
        {!printMode&&<td><button class="btn btn-success" onClick={handleadd}><i class="bi bi-plus"></i></button> <button class="btn btn-danger" onClick={() => delRow(row.id)}><i class="bi bi-x-octagon"></i></button></td>}
      </tr>
    ))}
    <tr>
    <td colspan="4">SubTotal</td>
    <td>{calculateTotal().toFixed(2)}</td>
  </tr>
    <tr>
    
      <td colspan="4">GST 18%</td>
      <td>{(state.subTotal * 0.18).toFixed(2)}</td>
    </tr>
    <tr>
    
      <td colspan="4">Total</td>
      <td>{(state.subTotal * 1.18).toFixed(2)}</td>
    </tr>

  </tbody>
   </table>
  
   {!printMode && <button className="btn btn-primary" onClick={handlePrint}>Print</button>}
    </div>
    </div>
  )
}

export default GstBilling



