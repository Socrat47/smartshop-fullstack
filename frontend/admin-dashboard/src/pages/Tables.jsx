import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, { useState } from 'react';
import DialogTable from '../components/DialogTable';

const Tables = ({ tables, loading, error }) => {
    const [visible, setVisible] = useState(false);
    const [order, setOrder] = useState(null);



    if (loading) return <div className="text-center text-lg font-medium">Yükleniyor...</div>;
    if (error) return <div className="text-center text-red-500 font-semibold">Hata: {error}</div>;

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5 mx-5'>
            {
                order && <DialogTable
                    visible={visible}
                    setVisible={setVisible}
                    order={order}
                    setOrder={setOrder}
                />
            }
            {tables.map((table) => (
                <div
                    key={table.id}
                    className={`${table.status === "full" ? "bg-red-100 border-l-4 border-red-500" : "bg-green-100 border-l-4 border-green-500"} rounded-md`}
                >
                    <Card title={table.name} style={{ height: 200 }}>
                        <p className="text-xl font-bold">
                            {table.status === "empty" ? "Boş" : "Dolu"}
                        </p>
                        {table.status === "full" ? <div className='mt-6 ml-20'>
                            <Button label="Siparişler" icon="pi pi-clipboard" onClick={() => { setVisible(true); setOrder(table) }} />
                        </div> : ""}
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default Tables;
