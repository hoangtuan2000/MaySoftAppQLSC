import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filterTime: [],
  filters: {
    status: {},
    type: {},
    incident: {},
    department: {},
    searchKey: ''
  }
}

export const filterReportSlice = createSlice({
  name: 'filterReportRedux',
  initialState,
  reducers: {
    createFilterTime: (state, action) => {
      state.filterTime = action.payload
    },
    deleteFilterTime: (state) => {
      state.filterTime = []
    },
    createFilterStatus: (state, action) => {
      state.filters.status = action.payload
    },
    createFilterType: (state, action) => {
      state.filters.type = action.payload
    },
    createFilterIncident: (state, action) => {
      state.filters.incident = action.payload
    },
    createFilterDepartment: (state, action) => {
      state.filters.department = action.payload
    },
    createFilterSearchKey: (state, action) => {
      state.filters.searchKey = action.payload
    },
    deleteAllFilters: (state) => {
      state.filters.status = {}
      state.filters.type = {}
      state.filters.incident = {}
      state.filters.department = {}
      state.filters.searchKey = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { createFilterTime, deleteFilterTime, createFilterStatus, createFilterType, createFilterIncident, createFilterDepartment, createFilterSearchKey, deleteAllFilters } = filterReportSlice.actions

export default filterReportSlice.reducer