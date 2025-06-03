import React, { useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import DataTableSkeleton from '../components/DataTableSkeleton';
import DialogUser from '../components/DialogUser';

const Users = ({ users, loading, error, createUser, updateUser, deleteUser }) => {
    const [visible, setVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const toast = useRef(null);

    const handleDelete = (user) => {
        confirmDialog({
            message: `${user.username} kullanıcısını silmek istediğinize emin misiniz?`,
            header: 'Onayla',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Evet',
            rejectLabel: 'Hayır',
            accept: async () => {
                try {
                    await deleteUser(user.id);
                    toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı silindi.', life: 3000 });
                } catch (err) {
                    toast.current.show({ severity: 'error', summary: 'Hata', detail: 'Kullanıcı silinemedi.', life: 3000 });
                }
            }
        });
    };

    if (loading) return DataTableSkeleton();
    if (error) return <p>{error}</p>;
    if (!users) return <div className='card flex items-center justify-center'><ProgressSpinner /></div>;

    return (
        <div className="card mt-20 flex flex-col items-center justify-center">
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className='ml-[650px] mb-10'>
                <Button label='Yeni Kullanıcı' icon='pi pi-plus' severity='primary' onClick={() => setVisible(true)} />
            </div>

            <DialogUser
                visible={visible}
                setVisible={setVisible}
                createUser={createUser}
                updateUser={updateUser}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />

            <DataTable value={users} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} className='w-200'>
                <Column header="Index" body={(rowData, { rowIndex }) => rowIndex + 1} className='w-15' />
                <Column field="username" header="Name" className='w-15' />
                <Column field="email" header="Email" className='w-15' />
                <Column field="status" header="Status" className='w-15' />
                <Column header="Edit" body={(rowData) => (<Button severity='warning' icon='pi pi-pen-to-square' onClick={() => { setSelectedUser(rowData); setVisible(true) }} />)} className='w-15' />
                <Column
                    header="Delete"
                    body={(rowData) => (
                        <Button
                            severity='danger'
                            icon='pi pi-trash'
                            onClick={() => handleDelete(rowData)}
                        />
                    )}
                    className='w-15'
                />
            </DataTable>
        </div>
    )
}

export default Users;
