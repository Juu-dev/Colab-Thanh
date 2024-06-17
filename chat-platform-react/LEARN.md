# EXPLAIN

## REDUX

### Config
- Create redux store by configureStore()
- Redux store includes:
    + List reducer
    + middleware

### Slice
- Slice file includes:
    + Setup *initialState*
    + Create *slice* by createSlice() with name, initialState and reducers
        - Slice extends: *extraReducers*  an extension to the reducer section with reducers not initialized in the current file
    + Export *actions*
    + Export *reducer*
- Params of createSlice(): 
    + The first is indentifier for slice (using when define reducer)
    + The second is initial state
    + The third is an object include reducers
    + The last is an object include additional reducers not initialized in the current file

### Reducer
- Function handle state value with action.payload

### Thunk
- Function handle fetching API by createAsyncThunk()
    + Params of createAsyncThunk(): 
        - The first is identifier for the action
        - The second is function call API

### Selector
- Function to extract information from the state of the Redux store
- useSelector() is hook for get state or initialized selector from store
- createSelector() is Selector memoized to optimization performance (EX: sort the data list and only reorders when the input data changes)

### Dispatch
- Function to send an action to store, then this action will trig corresponding reducers
- Action is action of reducer or thunk reducer that automatically created by createSlice


### Intergrate slice with thunk
- Using extraReducers to handle thunk
    + Setup case *pending*, *fulfilled* and *rejected* of each thunk and handle state with action.payload

## REACT HOOK FORM

### LV1: Basic usage
- Initalize form: *useForm()*
- Register fields: *register()*
- Handle submittion: *handleSubmit()*
- Display errors: *error*

### LV2: Apply validation
- Basic validation: Uses the rules available in the register for validation
- Schema Validation: Use the *yub* library or another library to authenticate with some powerful functionality

### LV3: Advanced usage
- Form Wizard: Use RHF to build multi step form
- Custom Controller: Intergrate RHF with UI lib or custom component not support *regiter*
- Share data form: *useFormContext()* to handle case when our input lives inside of deeply nested component trees

### LV4: Optimize performance
- *FormProvider*: It solves the problem where data is passed through the component tree without having to pass props down manually at every level
- Memoization: Avoid unnecessary form re-rendering with React.memo around input fields
- Lazy Loading: Use React.lazy and suspense to perform fetching and rendering field only when necessary
