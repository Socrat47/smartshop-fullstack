import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Image } from 'primereact/image';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react'
import DialogProduct from '../components/DialogProduct';

const Products = ({ products, loading, error, createProduct, categories, updateProduct, deleteProduct }) => {
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const toast = useRef(null);

    const handleDelete = (product) => {
        confirmDialog({
            message: `${product.name} Kategorisini silmek istediğinize emin misiniz?`,
            header: 'Onayla',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Evet',
            rejectLabel: 'Hayır',
            accept: async () => {
                try {
                    await deleteProduct(product.id);
                    toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Kategori silindi.', life: 3000 });
                } catch (err) {
                    toast.current.show({ severity: 'error', summary: 'Hata', detail: 'Kategori silinemedi.', life: 3000 });
                }
            }
        });
    };

    if (loading) return DataTableSkeleton();
    if (error) return <p>{error}</p>;
    if (!products) return <div className='card flex items-center justify-center'><ProgressSpinner /></div>;

    return (

        <div className="card mt-20 flex flex-col items-center justify-center">
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className='ml-[853px] mb-10'>
                <Button label='Yeni Ürün' icon='pi pi-plus' severity='primary' onClick={() => setVisible(true)} />
            </div>

            <DialogProduct
                visible={visible}
                setVisible={setVisible}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                categories={categories}
                createProduct={createProduct}
            />

            <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} className='w-250'>
                <Column header="Index" body={(rowData, { rowIndex }) => rowIndex + 1} className='w-15'></Column>
                <Column field="name" header="Name" className='w-15'></Column>
                <Column header="Description" body={(rowData) => (<p>{rowData.description.substring(0, 20)}...</p>)} className='w-15'></Column>
                <Column field="price" header="Price" className='w-15'></Column>
                <Column field="stock" header="Stock" className='w-15'></Column>
                <Column header="Image" body={(rowData) => (<Image alt={rowData.name} src={rowData.image} width='75' height='75' />)} className='w-15'></Column>
                <Column header="Edit" body={(rowData) => (<Button severity='warning' icon="pi pi-pen-to-square" onClick={() => { setSelectedProduct(rowData); setVisible(true) }} />)} className='w-15'></Column>
                <Column header="Delete" body={(rowData) => (<Button severity='danger' icon="pi pi-trash" onClick={() => handleDelete(rowData)} />)} className='w-15'></Column>
            </DataTable>
        </div>
    )
}

export default Products