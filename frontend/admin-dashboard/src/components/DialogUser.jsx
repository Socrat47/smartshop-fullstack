import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

const DialogUser = ({ visible, setVisible, createUser, updateUser, selectedUser, setSelectedUser }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        image: '',
        status: null
    });

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                username: selectedUser.username || '',
                email: selectedUser.email || '',
                password: '',
                image: selectedUser.image || '',
                status: selectedUser.status ? { name: selectedUser.status } : null
            });
        } else {
            setFormData({
                username: '',
                email: '',
                password: '',
                image: '',
                status: null
            });
        }
    }, [selectedUser, visible]);

    const toast = useRef(null);

    const statuses = [{ name: 'admin' }, { name: 'user' }];

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const { username, email, image, status } = formData;
        if (selectedUser) {
            return username && email && image && status;
        }
        return username && email && formData.password && image && status;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.current.show({ severity: 'error', summary: 'Hata', detail: 'Lütfen tüm alanları doldurun.', life: 3000 });
            return;
        }


        const payload = {
            username: formData.username,
            email: formData.email,
            image: formData.image,
            status: formData.status.name
        };

        if (formData.password) {
            payload.password = formData.password;
        }

        try {
            if (selectedUser) {
                await updateUser(selectedUser.id, payload);
                toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı güncellendi.', life: 3000 });
            } else {
                await createUser(payload);
                toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı oluşturuldu.', life: 3000 });
            }
            setVisible(false);
            setSelectedUser(null);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Hata', detail: selectedUser ? 'Kullanıcı güncellenemedi.' : 'Kullanıcı oluşturulamadı.', life: 3000 });
        }
    };

    const footerContent = (
        <div>
            <Button label="İptal" icon="pi pi-times" onClick={() => { setVisible(false); setSelectedUser(null); }} className="p-button-text" />
            <Button label={selectedUser ? "Güncelle" : "Oluştur"} icon="pi pi-check" onClick={handleSubmit} autoFocus />
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <Dialog
                header={selectedUser ? "Kullanıcı Düzenle" : "Kullanıcı Oluştur"}
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => { setVisible(false); setSelectedUser(null); }}
                footer={footerContent}
            >
                <div className='flex flex-col items-center justify-center gap-8 mt-10'>
                    <FloatLabel>
                        <InputText id="username" value={formData.username} onChange={(e) => handleChange("username", e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText id="email" keyfilter="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </FloatLabel>
                    <FloatLabel>
                        <Password id="password" value={formData.password} onChange={(e) => handleChange("password", e.target.value)} toggleMask />
                        <label htmlFor="password">Password</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText id="image" value={formData.image} onChange={(e) => handleChange("image", e.target.value)} />
                        <label htmlFor="image">Image URL</label>
                    </FloatLabel>
                    <Dropdown
                        value={formData.status}
                        options={statuses}
                        optionLabel="name"
                        placeholder="Statü seçin!"
                        onChange={(e) => handleChange("status", e.value)}
                    />
                </div>
            </Dialog>
        </>
    );
};

export default DialogUser;
