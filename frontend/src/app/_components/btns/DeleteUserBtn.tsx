"use client";
import Swal from "sweetalert2";
import { app } from "@/app/Api/axiosInstance";
import { memo } from "react";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: true,
});

const DeleteUserBtn = ({
  refetch,
  id,
}: {
  refetch: () => void;
  id: string;
}) => {
  const handelDeleteUser = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          app.delete(`users/${id}`).then((res) => {
            if (res.status === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
              return;
            }
            swalWithBootstrapButtons.fire({
              title: "Wrong!",
              text: "You can't delete this user.",
              icon: "error",
            });
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <button
      onClick={handelDeleteUser}
      className="btn text-white cursor-pointer bg-red-500"
    >
      Delete
    </button>
  );
};

export default memo(DeleteUserBtn);
