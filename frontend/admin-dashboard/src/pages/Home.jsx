
import { Card } from 'primereact/card'
import { Chart } from 'primereact/chart';
import { Image } from 'primereact/image'
import React from 'react'

const Home = ({ usersNumber, productsNumber, categoriesNumber }) => {
    const data = {
        labels: [
            'Kahvaltılar',
            'Tatlılar',
            'İçecekler',
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [500, 500, 500],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        cutout: '60%'
    };

    const data2 = {
        labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
        datasets: [
            {
                label: 'Satış Miktarı',
                data: [1200, 2000, 1500, 1800, 2200, 2500, 3000], // Örnek satış verileri
                fill: false,
                borderColor: 'rgb(75, 192, 192)', // Çizgi rengi
                tension: 0.1, // Çizgi gerilmesi
            },
        ],
    };

    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Y ekseni sıfırdan başlasın
            },
        },
    };

    return (
        <div className='mt-3'>
            <h1 className='text-3xl font-semibold mx-10'>Hoşgeldin Admin!</h1>
            <div className='grid grid-cols-3 mt-5 gap-6 mx-10'>
                <div className='flex flex-row items-center justify-center p-3 gap-2 shadow-2xl bg-purple-300 rounded-2xl'>
                    <Image src='https://minimal-kit-react.vercel.app/assets/icons/glass/ic-glass-users.svg' alt='icon' width={100} />
                    <div className='flex flex-col'>
                        <p className='text-3xl font-bold'>{usersNumber}</p>
                        <h1 className='text-xl font-semibold'>Toplam Kullanıcı</h1>
                    </div>
                </div>

                <div className='flex flex-row items-center justify-center p-3 gap-2 shadow-2xl bg-blue-300 rounded-2xl'>
                    <Image src='https://minimal-kit-react.vercel.app/assets/icons/glass/ic-glass-bag.svg' alt='icon' width={100} />
                    <div className='flex flex-col'>
                        <p className='text-3xl font-bold'>{productsNumber}</p>
                        <h1 className='text-xl font-semibold'>Toplam Ürün</h1>
                    </div>
                </div>

                <div className='flex flex-row items-center justify-center p-3 gap-2 shadow-2xl bg-yellow-100 rounded-2xl'>
                    <Image src='https://minimal-kit-react.vercel.app/assets/icons/glass/ic-glass-buy.svg' alt='icon' width={100} />
                    <div className='flex flex-col'>
                        <p className='text-3xl font-bold'>{categoriesNumber}</p>
                        <h1 className='text-xl font-semibold'>Toplam Kategori</h1>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-6 mt-10 mx-10 gap-3'>
                <Card className='col-span-2' title="En Çok Satış Yapan Kategoriler">
                    <Chart type="doughnut" data={data} options={options} className="" />
                </Card>

                <Card title="Satış Performansı (Haftalık)" className="col-span-4">
                    <Chart type="line" data={data2} options={options2} />
                </Card>
            </div>
        </div>
    )
}

export default Home