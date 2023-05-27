const CHECK_VALUE_INFORUSER = (values) => {
  const error = {};
  const emailtest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;
  if (values.tennguoidatve === '') {
    error.tennguoidatve = 'Vui lòng điền tên người đặt vé';
  }
  if (values.sodienthoai === '') {
    error.sodienthoai = 'Vui lòng điền só điện thoại';
  }
  if (!emailtest.test(values.email)) {
    error.email = 'Sai định dạng mail, vui lòng nhập lại !';
  }
  return error;
};
const validation = (values) => {
  const error = {};
  const phone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  const emailtest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;
  const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;

  if (values.mataikhoan < 10) {
    error.mataikhoan = 'Vui lòng nhập đủ 10 chữ số';
  } else if (!phone.test(values.mataikhoan)) {
    error.mataikhoan = 'Sai định dạng, vui lòng nhập lại!!';
  }
  if (values.name === '') {
    error.name = 'Vui lòng nhập tên';
  }
  if (!emailtest.test(values.email)) {
    error.email = 'Sai định dạng mail, vui lòng nhập lại!!!';
  }
  if (!password.test(values.matkhau)) {
    error.matkhau = 'Ít nhất 8 kí tự, 1 chữ cái, 1 số và 1 kí tự đặt biệt';
  }
  return error;
};
const validationStaff = (values) => {
  const error = {};
  const phone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  const emailtest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;
  const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;

  if (values.mataikhoan < 10) {
    error.mataikhoan = 'Vui lòng nhập đủ 10 chữ số';
  } else if (!phone.test(values.mataikhoan)) {
    error.mataikhoan = 'Sai định dạng, vui lòng nhập lại!!';
  }
  if (values.name === '') {
    error.name = 'Vui lòng nhập tên';
  }
  if (!emailtest.test(values.email)) {
    error.email = 'Sai định dạng mail, vui lòng nhập lại!!!';
  }
  if (!password.test(values.password)) {
    error.matkhau = 'Ít nhất 8 kí tự, 1 chữ cái, 1 số và 1 kí tự đặt biệt';
  }
  if (values.permission === '') {
    error.chucvu = 'Vui lòng chọn chức vụ';
  }
  if (values.sex === '') {
    error.sex = 'Vui lòng chọn giới tính';
  }
  if (values.date === '') {
    error.date = 'Vui lòng chọn ngày sinh';
  }
  if (values.address === '') {
    error.address = 'Vui lòng nhập địa chỉ';
  }
  return error;
};

export { CHECK_VALUE_INFORUSER, validation, validationStaff };
