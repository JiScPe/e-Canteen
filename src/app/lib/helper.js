import { query } from "./db"

export async function updateCouponUsage(emp_pri_id) {
    const sql = `update employee_privilege set coupon_usage = true where id = ${emp_pri_id} AND coupon_usage IS NOT true RETURNING *`

    const updateRes = await query(sql)

    return updateRes
}