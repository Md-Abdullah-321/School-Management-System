import { createSlice } from "@reduxjs/toolkit";



const initialUserInfo = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    subjects: "",
    role: "",
    picture: "",
}

export const teacherSlice = createSlice({
    name: "teacher",
    initialState: initialUserInfo,
    reducers: {
        setTeacherInfo: (state, action) => {
            const { firstName, lastName, email, phoneNumber, address, subjects, role, picture } = action.payload;

            state.firstName = firstName || state.firstName;
            state.lastName = lastName || state.lastName;
            state.email = email || state.email;
            state.phoneNumber = phoneNumber || state.phoneNumber;
            state.address = address || state.address;
            state.subjects = subjects || state.subjects;
            state.role = role || state.role;
            state.picture = picture || state.picture;
        }
    }
})

export const { setTeacherInfo } = teacherSlice.actions;

export const teacherReducer = teacherSlice.reducer;