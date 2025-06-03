import React, { useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import DataTableSkeleton from '../components/DataTableSkeleton';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import DialogCategory from '../components/DialogCategory';

const Categories = ({ categories, loading, error, createCategory, updateCategory, deleteCategory }) => {
    const [visible, setVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const toast = useRef(null);

    const handleDelete = (category) => {
        confirmDialog({
            message: `${category.name} Kategorisini silmek istediğinize emin misiniz?`,
            header: 'Onayla',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Evet',
            rejectLabel: 'Hayır',
            accept: async () => {
                try {
                    await deleteCategory(category.id);
                    toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Kategori silindi.', life: 3000 });
                } catch (err) {
                    toast.current.show({ severity: 'error', summary: 'Hata', detail: 'Kategori silinemedi.', life: 3000 });
                }
            }
        });
    };

    if (loading) return DataTableSkeleton();
    if (error) return <p>{error}</p>;
    if (!categories) return <div className='card flex items-center justify-center'><ProgressSpinner /></div>;

    return (
        <div className="card mt-20 flex flex-col items-center justify-center">
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className='ml-[620px] mb-10'>
                <Button label='Yeni Kategori' icon='pi pi-plus' severity='primary' onClick={() => setVisible(true)} />
            </div>

            <DialogCategory
                visible={visible}
                setVisible={setVisible}
                createCategory={createCategory}
                updateCategory={updateCategory}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <DataTable value={categories} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} className='w-200'>
                <Column header="Index" body={(rowData, { rowIndex }) => rowIndex + 1} className='w-15'></Column>
                <Column field="name" header="Name" className='w-15'></Column>
                <Column field="createdAt" header="Created" className='w-15'></Column>
                <Column field="updatedAt" header="Updated" className='w-15'></Column>
                <Column header="Edit" body={(rowData) => (<Button severity='warning' icon="pi pi-pen-to-square" onClick={() => { setSelectedCategory(rowData); setVisible(true) }} />)} className='w-15'></Column>
                <Column header="Delete" body={(rowData) => (<Button severity='danger' icon="pi pi-trash" onClick={() => handleDelete(rowData)} />)} className='w-15'></Column>
            </DataTable>
        </div>
    )
}

export default Categories