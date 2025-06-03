import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'

const DialogCategory = ({ visible, setVisible, createCategory, updateCategory, selectedCategory, setSelectedCategory }) => {
    const [categoryName, setCategoryName] = useState("");

    const toast = useRef(null);

    useEffect(() => {
        if (selectedCategory) {
            setCategoryName(selectedCategory.name)
        } else {
            setCategoryName("");
        }
    }, [selectedCategory, visible])

    const handleSubmit = async () => {
        try {
            if (selectedCategory) {
                await updateCategory(selectedCategory.id, categoryName);
                toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Kategori güncellendi.', life: 3000 });
            } else {
                await createCategory(categoryName);
                toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Kategori oluşturuldu.', life: 3000 });
                setCategoryName("");
            }
            setVisible(false);
            setSelectedCategory(null);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Hata', detail: selectedCategory ? 'Kategori güncellenemedi.' : 'Kategori oluşturulamadı.', life: 3000 });
        }
    };

    const footerContent = (
        <div>
            <Button label="İptal" icon="pi pi-times" onClick={() => { setVisible(false); setSelectedCategory(null); }} className="p-button-text" />
            <Button label={selectedCategory ? "Güncelle" : "Oluştur"} icon="pi pi-check" onClick={handleSubmit} autoFocus />
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <Dialog
                header={selectedCategory ? "Kategori Düzenle" : "Kategori Oluştur"}
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => { setVisible(false); setSelectedCategory(null); }}
                footer={footerContent}
            >
                <div className='flex flex-col items-center justify-center gap-8 mt-10'>
                    <FloatLabel>
                        <InputText id='categoryName' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className='w-64' />
                        <label>Name</label>
                    </FloatLabel>
                </div>
            </Dialog>
        </>
    );
}

export default DialogCategory