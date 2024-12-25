import { updateCouponUsage } from "@/app/lib/helper";
import { query } from "./../../../lib/db";

export async function GET(req, { params }) {
  const { emp_id } = await params;
  const sql = `select
                ep.id,
                ep.access_datetime,
                ep.person_id,
                ep.coupon_usage,
                er.emp_id,
                er.rand_emp_id
            from
                employee_privilege ep
            left join
                employee_random er on er.emp_id = ep.person_id
            where
                er.rand_emp_id = '${emp_id}'
                and date(access_datetime) = current_date `;
  // Connect Database
  try {
    const data = await query(sql);
    //Check Attendance
    if (data.length < 1) {
      return Response.json({ message: "ไม่พบพนักงาน / ไม่มีข้อมูลสแกนใบหน้า !" }, { status: 404 });
    }

    // Check Coupon usage
    if (data[0].coupon_usage === false) {
      // Not use yet -> update flag
      const updateRes = await updateCouponUsage(data[0].id);
      // Validate the updateRes
      console.log(`Update Result:`, updateRes)
      if (!updateRes || !updateRes.length) {
        return Response.json(
          { message: "อัพเดทไม่สำเร็จ !", id: data[0].person_id }, { status: 404 },
        );
      } else {
        return Response.json(
          { message: "ใช้คูปองสำเร็จ ☻", id: data[0].person_id }, { status: 200 },
        );
      }
    } else {
      return Response.json(
        { message: "คูปองใช้ไปแล้ว !", id: data[0].person_id }, { status: 403 },
      );
    }
  } catch (error) {
    return Response.json(
      { message: `Database Error: ${error.message}` },
      { status: 500 }
    );
  }
}
