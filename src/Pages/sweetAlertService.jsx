// sweetAlertService.js

import Swal from "sweetalert2";

const sweetAlertService = {
  showAlert: (title, text, icon) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: false,
      timer: 3000, // Auto close after 3 seconds
    });
  },
};

export default sweetAlertService;
