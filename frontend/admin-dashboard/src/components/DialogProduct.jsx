import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'

const DialogProduct = ({ visible, setVisible, createProduct, updateProduct, selectedProduct, setSelectedProduct, categories }) => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image: "",
        categoryName: ""
    });

    useEffect(() => {
        if (selectedProduct) {
            setProduct({
                name: selectedProduct.name,
                description: selectedProduct.description,
                price: selectedProduct.price,
                stock: selectedProduct.stock,
                image: selectedProduct.image,
                categoryName: selectedProduct.categoryName
            })
        } else {
            setProduct({
                name: "",
                description: "",
                price: 0,
                stock: 0,
                image: "",
                categoryName: ""
            })
        }
    }, [selectedProduct, visible]);

    const toast = useRef(null);

    const handleSubmit = async () => {
        try {
            if (selectedProduct) {
                await updateProduct(selectedProduct.id, product);
                toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Ürün güncellendi.', life: 3000 });
            } else {
                await createProduct(product);
                toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Ürün oluşturuldu.', life: 3000 });
                setProduct({
                    name: "",
                    description: "",
                    price: 0,
                    stock: 0,
                    image: "",
                    categoryName: ""
                });
            }
            setVisible(false);
            setSelectedCategory(null);
        } catch (error) {
            // toast.current.show({ severity: 'error', summary: 'Hata', detail: selectedProduct ? 'Ürün güncellenemedi.' : 'Ürün oluşturulamadı.', life: 3000 });
        }
    };

    const handleChange = (field, value) => {
        setProduct(prev => ({ ...prev, [field]: value }));
    };

    const footerContent = (
        <div>
            <Button label="İptal" icon="pi pi-times" onClick={() => { setVisible(false); setSelectedProduct(null); }} className="p-button-text" />
            <Button label={selectedProduct ? "Güncelle" : "Oluştur"} icon="pi pi-check" onClick={handleSubmit} autoFocus />
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <Dialog
                header={selectedProduct ? "Ürün Düzenle" : "Ürün Oluştur"}
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => { setVisible(false); setSelectedProduct(null); }}
                footer={footerContent}
            >
                <div className='flex flex-col items-center justify-center gap-6 mt-10'>
                    <FloatLabel>
                        <InputText id='name' value={product.name} onChange={(e) => handleChange("name", e.target.value)} className='w-64' />
                        <label>İsim</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputTextarea
                            id='description' value={product.description} onChange={(e) => handleChange("description", e.target.value)} className='w-64' rows={3} />
                        <label>Açıklama</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputNumber
                            id='price' value={product.price} onValueChange={(e) => handleChange("price", e.target.value)} className='w-64' />
                        <label>Fiyat</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputNumber
                            id='stock' value={product.stock} onValueChange={(e) => handleChange("stock", e.target.value)} className='w-64' />
                        <label>Stok</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText
                            id='image' value={product.image} onChange={(e) => handleChange("image", e.target.value)} className='w-64' rows={5} />
                        <label>Ürün Görseli</label>
                    </FloatLabel>
                    <Dropdown
                        value={product.categoryName}
                        options={categories.map(c => c.name)}
                        optionLabel="categoryName"
                        placeholder="Kategori Seçin!"
                        onChange={(e) => handleChange("categoryName", e.value)}
                    />
                </div>
            </Dialog>
        </>
    )
}

export default DialogProduct