// {
//   "userData": {
//     "_id": "66d7524ac6fcd2b40714776f",
//     "name": "Dhruv Agrawal",
//     "username": "dhruv2505",
//     "email": "dhruv2505.dag@gmail.com",
//     "role": "employee",
//     // ...other fields...
//   },
//   "token": "your_jwt_token_here"
// }




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  role: null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

/**
 isAuthenticated: !!localStorage.getItem("token")-->
 
Double negation (!!) is a common JavaScript trick to convert any value into a boolean:
If localStorage.getItem("token") returns a truthy value (i.e., a non-empty string, such as a valid token), !! will convert it to true.
If localStorage.getItem("token") returns a falsy value (null, undefined, "", etc.), !! will convert it to false.
This ensures that isAuthenticated is always a boolean (true or false), which is often more predictable and useful in authentication checks. 
 */

// Helper function to choose API route based on role
const getApiEndpoint = (role, type) => {
  const base = "http://localhost:5000/api";
  if (role === "employee") {
    return type === "login" 
    ? `${base}/login` 
    : `${base}/signup`;
  } else if (role === "employer") {
    return type === "login"
      ? `${base}/organisation/login`
      : `${base}/organisation/signup`;
  }
  throw new Error("Invalid role");
  
};

export const login = createAsyncThunk( "/login", async ({ loginData, role }, { rejectWithValue }) => {
    try {
      const apiEndpoint = getApiEndpoint(role, "login");
      if(role === 'employer') loginData.adminEmail = loginData.email;

      const response = await axios.post(apiEndpoint, loginData);
      const apiData = response.data;
      const data = apiData.userData ? apiData.userData : apiData.organisationData;
      const { token } = apiData;
      // console.log(data)

      return {
        data,
        token,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || "Login failed"
      );
    }
  }
);

export const signup = createAsyncThunk( "/signup", async ({ signupData, role }, { rejectWithValue }) => {
    try {
      const apiEndpoint = getApiEndpoint(role, "signup");
      const response = await axios.post(apiEndpoint, signupData);
      const apiData = response.data;
      const data = apiData.userData ? apiData.userData : apiData.organisationData;
      const { token } = apiData;
     

      return {
        data,
        token,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Signup failed"
      );
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.role = action.payload.data.role;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed.";
        state.isAuthenticated = false;
     
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      
        state.token = action.payload.token;
        state.role = action.payload.data.role;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed.";
        state.isAuthenticated = false;
      })
     
  },
});

export const authLoading = (state)=> state.auth.loading;

export const authError =(state)=> state.auth.error;



export const { logout } = authSlice.actions;
export default authSlice.reducer;






// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";


// const initialState = {
//   user: null,
//   token: null,
//   role: null, // 'individual' or 'organization'
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// // Helper function to choose API route based on role
// const getApiEndpoint = (role, type) => {
//   const base = "/api";
//   if (role === "employee") {
//     return type === "login" ? `${base}/login` : `${base}/signup`;
//   } else if (role === "employer") {
//     return type === "login" ? `${base}/organisation/login` : `${base}/organisation/signup`;
//   }
//   throw new Error("Invalid role");
// };


// export const login = createAsyncThunk("/login", async ({ loginData, role }, { rejectWithValue }) => {
//   try {
//     const apiEndpoint = getApiEndpoint(role, "login");
//     const response = await axios.post(apiEndpoint, loginData);
//     return response.data; // user data + token 
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });


// export const signup = createAsyncThunk("/signup", async ({signupData,role}, { rejectWithValue }) => {
//   try {
//     const apiEndpoint = getApiEndpoint(role, "signup");
//     const response = await axios.post(apiEndpoint, signupData);
//     return response.data; // user data + token 
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// //token based login
// export const loginWithToken = createAsyncThunk(
//   "auth/loginWithToken",
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("/api/user", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return { userData: response.data, token };
//     } catch (error) {
//       localStorage.removeItem("token");
//       return rejectWithValue(error.response.data);
//     }
//   }
// );



// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.role = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         console.log("Login fulfilled:", action.payload);
//         state.loading = false;
//         state.user = action.payload.userData;
//         state.token = action.payload.token;
//         state.role = action.payload.userData.role;
//         state.isAuthenticated = true;
//         localStorage.setItem("token", action.payload.token);
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//       })
//       .addCase(signup.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signup.fulfilled, (state, action) => {
//         console.log("Signup fulfilled:", action.payload);
//         state.loading = false;
//         state.user = action.payload.userData;
//         state.token = action.payload.token;
//         state.role = action.payload.userData.role;
//         state.isAuthenticated = true;
//         localStorage.setItem("token", action.payload.token);
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//       })
//       .addCase(loginWithToken.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginWithToken.fulfilled, (state, action) => {
//         console.log("Token login fulfilled:", action.payload);
//         state.loading = false;
//         state.user = action.payload.userData;
//         state.token = action.payload.token;
//         state.role = action.payload.userData.role;
//         state.isAuthenticated = true;
//         localStorage.setItem("token", action.payload.token); // Store token
//       })
      
//       .addCase(loginWithToken.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//         state.token = null;
//         state.user = null;
//         state.role = null;
//       });
//   },
// });
// console.log(authSlice);

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
