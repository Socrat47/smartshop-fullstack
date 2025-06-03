import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
    users: [],
    usersNumber: null,
    loading: false,
    error: null,

    getUsers: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get("http://localhost:3000/api/users");
            const data = res.data;
            if (data.status == "success") {
                set({ users: data.data, usersNumber: data.data.length });
            }
            else {
                set({ error: "Veri formatı beklenenden farklı!" })
            }
        } catch (err) {
            set({ error: "Kullanıcı bulunamadı!", loading: false });
        }
        finally {
            set({ loading: false })
        }
    },

    createUser: async (user) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post("http://localhost:3000/api/users/create-user", user);
            const data = res.data;
            if (data.status == "success") {
                const refreshedUsers = await axios.get("http://localhost:3000/api/users");
                set({
                    users: refreshedUsers.data.data,
                    usersNumber: refreshedUsers.data.data.length
                });
            } else {
                set({ error: "Kullanıcı oluşturulamadı!" });
            }
        } catch (err) {
            set({ error: "Sunucu hatası: Kullanıcı eklenemedi." });
        } finally {
            set({ loading: false });
        }
    },

    updateUser: async (id, user) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.put(`http://localhost:3000/api/users/update-user/${id}`, user);
            const data = res.data;
            if (data.status == "success") {
                const refreshedUsers = await axios.get("http://localhost:3000/api/users");
                set({
                    users: refreshedUsers.data.data,
                    usersNumber: refreshedUsers.data.data.length
                });
            } else {
                set({ error: "Kullanıcı güncellenemedi!" });
            }
        } catch (err) {
            set({ error: "Sunucu hatası: Kullanıcı Güncellenemedi." });
        } finally {
            set({ loading: false });
        }
    },

    deleteUser: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.delete(`http://localhost:3000/api/users/delete-user/${id}`);
            const data = res.data;
            if (data.status == "success") {
                const refreshedUsers = await axios.get("http://localhost:3000/api/users");
                set({
                    users: refreshedUsers.data.data,
                    usersNumber: refreshedUsers.data.data.length
                });
            } else {
                set({ error: "Kullanıcı silinemedi!" });
            }
        } catch (err) {
            set({ error: "Sunucu hatası: Kullanıcı Silinemedi!" });
        } finally {
            set({ loading: false });
        }
    }
}));

const useCategoryStore = create((set) => ({
    categories: [],
    categoriesNumber: null,
    loading: false,
    error: null,

    getCategories: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get("http://localhost:3000/api/categories");
            const data = res.data;
            if (data.status == "success") {
                set({ categories: data.data, categoriesNumber: data.data.length });
            } else {
                set({ error: "Veri formatı beklenenden farklı!" })
            }
        } catch (err) {
            set({ error: "Kategori bulunamadı!" });
        } finally {
            set({ loading: false })
        }
    },
    createCategory: async (categoryName) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post("http://localhost:3000/api/categories/create-category", { name: categoryName });
            const data = res.data;
            if (data.status == "success") {
                const refreshedCategories = await axios.get("http://localhost:3000/api/categories");
                set({
                    categories: refreshedCategories.data.data,
                    categoriesNumber: refreshedCategories.data.data.length
                })
            } else {
                set({ error: "Kategori oluşturulamadı!" })
            }
        } catch (err) {
            set({ error: "Kategori oluşturulurken bir hata oluştu!" })
        } finally {
            set({ loading: false })
        }
    },

    updateCategory: async (categoryId, categoryName) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.put(`http://localhost:3000/api/categories/update-category/${categoryId}`, { name: categoryName });
            const data = res.data;
            if (data.status == "success") {
                const refreshedCategories = await axios.get("http://localhost:3000/api/categories");
                set({
                    categories: refreshedCategories.data.data,
                    categoriesNumber: refreshedCategories.data.data.length
                })
            } else {
                set({ error: "Kategori güncellenemedi!" });
            }
        } catch (err) {
            set({ error: "Kategori güncellenirken bir hata oluştu!" })
        } finally {
            set({ loading: false })
        }
    },

    deleteCategory: async (categoryId) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.delete(`http://localhost:3000/api/categories/delete-category/${categoryId}`);
            const data = res.data;
            if (data.status == "success") {
                const refreshedCategories = await axios.get("http://localhost:3000/api/categories");
                set({
                    categories: refreshedCategories.data.data,
                    categoriesNumber: refreshedCategories.data.data.length
                })
            } else {
                set({ error: "Kategori silinemedi!" })
            }
        } catch (err) {
            set({ error: "Kategori silinirken bir hata oluştu!" });
        } finally {
            set({ loading: false })
        }
    }
}))

const useProductStore = create((set) => ({
    products: [],
    productsNumber: null,
    loading: false,
    error: null,

    getProducts: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get("http://localhost:3000/api/products");
            const data = res.data;
            if (data.status == "success") {
                set({ products: data.data, productsNumber: data.data.length });
            } else {
                set({ error: data.data.message });
            }
        } catch (err) {
            set({ error: "Ürünler getirilirken bir hata oluştu!" });
        } finally {
            set({ loading: false });
        }
    },

    createProduct: async (product) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post("http://localhost:3000/api/products/create-product", {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                image: product.image,
                categoryName: product.categoryName
            });
            const data = res.data;
            if (data.status == "success") {
                const refreshedProducts = await axios.get("http://localhost:3000/api/products");
                set({
                    products: refreshedProducts.data.data,
                    productsNumber: refreshedProducts.data.data.length
                });
            } else {
                set({ error: data.message });
            }
        } catch (err) {
            set({ error: "Ürün oluşturulurken bir hata oluştu!" });
        } finally {
            set({ loading: false });
        }
    },

    updateProduct: async (id, product) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.put(`http://localhost:3000/api/products/update-product/${id}`, {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                image: product.image,
                categoryName: product.categoryName
            });
            const data = res.data;
            if (data.status == "success") {
                const refreshedProducts = await axios.get("http://localhost:3000/api/products");
                set({
                    products: refreshedProducts.data.data,
                    productsNumber: refreshedProducts.data.data.length
                });
            } else {
                set({ error: data.message });
            }
        } catch (err) {
            set({ error: "Ürün güncellenirken bir hata oluştu!" })
        } finally {
            set({ loading: false });
        }
    },

    deleteProduct: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.delete(`http://localhost:3000/api/products/delete-product/${id}`);
            const data = res.data;
            if (data.status == "success") {
                const refreshedProducts = await axios.get("http://localhost:3000/api/products");
                set({
                    products: refreshedProducts.data.data,
                    productsNumber: refreshedProducts.data.data.length
                });
            } else {
                set({ error: data.message });
            }
        } catch (err) {
            set({ error: "Ürün silinirken bir hata oluştu!" })
        } finally {
            set({ loading: false });
        }
    }
}));

const useTableStore = create((set) => ({
    tables: [],
    loading: false,
    error: null,

    getTables: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get("http://localhost:3000/api/tables");
            const data = res.data;
            if (data.status == "success") {
                set({ tables: data.data });
            } else {
                set({ error: "Veri formatı beklenenden farklı!" });
            }
        } catch (error) {
            set({ error: error.message })
        } finally {
            set({ loading: false })
        }
    }
}))

const useOrderStore = create((set) => ({
    orders: [],
    loading: false,
    error: null,

    getOrders: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get("http://localhost:3000/api/orders");
            const data = res.data;
            if (data.status == "success") {
                set({ orders: data.data })
            } else {
                set({ error: "Bilinmeyen veri formatı!" })
            }
        } catch (err) {
            set({ error: err.message })
        } finally {
            set({ loading: false })
        }
    },

    paymentOrder: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.put(`http://localhost:3000/api/orders/payment-order/${id}`, { status: "success" });
            const data = res.data;
            if (data.status == "success") {
                const refreshedOrders = await axios.get("http://localhost:3000/api/orders");
                set({ orders: refreshedOrders.data.data })
            } else {
                set({ error: "Beklenmeyen bir hata ile karşılaşıldı!" })
            }
        } catch (err) {
            set({ error: err.message })
        } finally {
            set({ loading: false })
        }
    }
}))

export { useUserStore, useCategoryStore, useProductStore, useTableStore, useOrderStore };