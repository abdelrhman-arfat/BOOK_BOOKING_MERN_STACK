import { useGetAllUsersQuery } from "@/app/_RTK/RTK-query/query";
import { app } from "@/app/Api/axiosInstance";
import { userRoles } from "@/app/constant/userRoles";
import React, { memo } from "react";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: true,
});

const ChangeRoleBtn = ({ id, role }: { role: string; id: string }) => {
  const roles = [
    userRoles.USER,
    userRoles.ADMIN,
    userRoles.SUPERADMIN,
    userRoles.LEADER,
  ];

  const { refetch } = useGetAllUsersQuery();
  return (
    <select
    defaultValue=""
      onChange={(e) => {
        if (!e.target.value) return;
        swalWithBootstrapButtons
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change Role!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              app
                .post(`users/${id}`, {
                  role: e.target.value,
                })
                .then((res) => {
                  if (res.status === 200) {
                    Swal.fire({
                      title: "Updated Successfully!",
                      icon: "success",
                      draggable: true,
                    });
                    refetch();
                    return;
                  }
                  console.log(res);
                  Swal.fire({
                    title: "Cannot Updated Successfully!",
                    text:
                      (res.data.message as string) || "Something went wrong",
                    icon: "error",
                    draggable: false,
                  });

                  return;
                });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary Order is safe ",
                icon: "error",
              });
            }
          });
      }}
      name="role"
      id=""
    >
      <option value="" disabled >
        Select Role
      </option>
      {roles.map(
        (r) =>
          role !== r && (
            <option key={r} value={r}>
              {r}
            </option>
          )
      )}
    </select>
  );
};

export default memo(ChangeRoleBtn);
