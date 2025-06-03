import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react'
import DialogOrder from '../components/DialogOrder';

const Orders = ({ orders, loading, error, paymentOrder }) => {
    const [visible, setVisible] = useState(false);
    const [orderDetail, setOrderDetail] = useState(null)
    return (
        <div className="card mt-20 flex flex-col items-center justify-center">
            {
                orderDetail && <DialogOrder
                    visible={visible}
                    setVisible={setVisible}
                    orderDetail={orderDetail}
                    setOrderDetail={setOrderDetail}
                    paymentOrder={paymentOrder}
                />
            }


            <DataTable value={orders} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} className='w-200'>
                <Column header="Index" body={(rowData, { rowIndex }) => rowIndex + 1} className='w-15'></Column>
                <Column header="Müşteri" body={(rowData) => rowData.user.username} className='w-15'></Column>
                <Column field="total" header="Fiyat" className='w-15'></Column>
                <Column header="Durum" body={(rowData) => rowData.status == "success" ? <Badge value={"Ödendi"}></Badge> : <Badge value={"Bekleniyor"} severity={'warning'}></Badge>} className='w-15'></Column>
                <Column header="Detay" body={(rowData) => (<Button severity='success' icon="pi pi-info-circle" onClick={() => { setVisible(true); setOrderDetail(rowData) }} />)} className='w-15'></Column>
            </DataTable>
        </div>
    )
}

export default Orders