import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

const DialogOrder = ({ visible, setVisible, orderDetail, setOrderDetail, paymentOrder }) => {
    if (!orderDetail) return null;

    const getStatusSeverity = (status) => {
        switch (status) {
            case 'success':
                return 'success';
            case 'pending':
                return 'warning';
            default:
                return 'info';
        }
    };

    return (
        <Dialog
            header="Sipariş Detayı"
            visible={visible}
            style={{ width: '40vw' }}
            onHide={() => setVisible(false)}
            className="p-dialog-custom"
            footer={
                orderDetail.status !== 'success' && (
                    <Button
                        label="Ödeme Yap"
                        icon="pi pi-credit-card"
                        onClick={() => { paymentOrder(orderDetail?.id); setVisible(false) }}
                        className="p-button-success"
                    />
                )
            }
        >
            <Card className="w-full">
                <div className="flex flex-col gap-3 text-base">

                    <div className="flex justify-between">
                        <span className="font-semibold">Müşteri:</span>
                        <span>{orderDetail?.user?.username}</span>
                    </div>

                    <Divider />

                    <div className="flex justify-between">
                        <span className="font-semibold">Masa:</span>
                        <span>{orderDetail?.table?.name || "Belirtilmemiş"}</span>
                    </div>

                    <Divider />

                    <div className="flex justify-between">
                        <span className="font-semibold">Toplam Tutar:</span>
                        <span>{orderDetail?.total} ₺</span>
                    </div>

                    <Divider />

                    <div className="flex justify-between">
                        <span className="font-semibold">Durum:</span>
                        <Tag severity={getStatusSeverity(orderDetail.status)} value={orderDetail.status === 'success' ? 'Ödendi' : 'Beklemede'}></Tag>
                    </div>

                    <Divider />

                    <div className="mt-2">
                        <span className="font-semibold">Sipariş Ürünleri:</span>
                        <ul className="list-disc ml-6 mt-2">
                            {orderDetail.items.map((item, index) => (
                                <li key={index}>
                                    {item.product.name} <span className="text-sm text-gray-500">(Adet: {item.quantity || 1})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>
        </Dialog>
    );
};

export default DialogOrder;
