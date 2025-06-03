import { Card } from 'primereact/card'
import { Dialog } from 'primereact/dialog'
import { Divider } from 'primereact/divider'
import { Tag } from 'primereact/tag'
import React from 'react'

const DialogTable = ({ visible, setVisible, order, setOrder }) => {
    if (!order) return null;

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


    const pendingOrders = order.orders?.filter(o => o.status === 'pending');

    return (
        <Dialog
            header="Sipariş Detayı"
            visible={visible}
            style={{ width: '40vw' }}
            onHide={() => setVisible(false)}
            className="p-dialog-custom"
        >
            <Card className="w-full">
                <div className="flex flex-col gap-3 text-base">
                    <div className="flex justify-between">
                        <span className="font-semibold">Masa:</span>
                        <span>{order.name || "Belirtilmemiş"}</span>
                    </div>

                    {pendingOrders?.map((ord, index) => (
                        <div key={index} className="mt-4 border-t pt-3">
                            <div className="flex justify-between">
                                <span className="font-semibold">Müşteri:</span>
                                <span>{ord.user?.username || "Anonim"}</span>
                            </div>

                            <Divider />

                            <div className="flex justify-between">
                                <span className="font-semibold">Toplam Tutar:</span>
                                <span>{ord.total} ₺</span>
                            </div>

                            <Divider />

                            <div className="flex justify-between">
                                <span className="font-semibold">Durum:</span>
                                <Tag severity={getStatusSeverity(ord.status)} value={ord.status === 'success' ? 'Ödendi' : 'Beklemede'}></Tag>
                            </div>

                            <Divider />

                            <div>
                                <span className="font-semibold">Sipariş Ürünleri:</span>
                                <ul className="list-disc ml-6 mt-2">
                                    {ord.items.map((item, idx) => (
                                        <li key={idx}>
                                            {item.product?.name} <span className="text-sm text-gray-500">(Adet: {item.quantity})</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    {pendingOrders?.length === 0 && (
                        <div className="mt-4 text-gray-500">Bekleyen sipariş bulunmamaktadır.</div>
                    )}
                </div>
            </Card>
        </Dialog>
    )
}

export default DialogTable
