import React from 'react'
import { DashboardLayout } from '@components/components/dashboard'
import MyCourses from '@components/components/dashboard/dashboardUser/myCourses'

const UserCourses = () => {
    return (
        <DashboardLayout title="Actualizar mis datos">
            <MyCourses/>
        </DashboardLayout>
    )
}

export default UserCourses;