import { DashboardLayout } from "@components/components/dashboard";
import MembershipsMoreSold from "@components/components/dashboard/resumen/MembershipsMoreSold";
import BalancePerMont from "@components/components/dashboard/resumen/BalancePerMont";
import RegisterUser from "@components/components/dashboard/resumen/RegisterUser";
import SalePerMontPrice from "@components/components/dashboard/resumen/SalePerMontPrice";
import SalePerMontProduct from "@components/components/dashboard/resumen/SalePerMontProduct";
import BalanceCurrentMont from "@components/components/dashboard/resumen/BalanceCurrentMont";

const DashboardAdm = () => {
    return (
        <DashboardLayout title="Resumen">
            <div className="w-full">
                <div className="px-7 my-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                    <MembershipsMoreSold />
                    <BalancePerMont />
                </div>
                <div className='px-7 my-5 grid grid-cols-1 gap-5 lg:grid-cols-2'>
                    <RegisterUser />
                </div>
                <div className="px-7 my-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    <SalePerMontPrice />
                    <SalePerMontProduct />
                    <BalanceCurrentMont />
                </div>
            </div>
        </DashboardLayout>
    )
}
export default DashboardAdm