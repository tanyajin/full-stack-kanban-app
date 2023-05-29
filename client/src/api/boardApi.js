import axiosClent from './axiosClient'

const boardApi ={
    create:()=> axiosClent.post('boards'),
    getAll:()=> axiosClent.get('boards')
}

export default boardApi
