import React, { useState } from 'react'
import { Button, Checkbox, Input, Select, message, TreeSelect } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { categoryList } from '../../Category.js'
import * as SearchAPI from '../../API/SearchAPI'
import './SearchBar.css'

const SearchBar = (props) => {
  let { prophecies, setProphecies, sortByCreateTime } = props


    //============================= Major option for select bar =================================
    const categoryOptions = [];
    for (let category of categoryList) {
        categoryOptions.push({
            value: category,
            label: category,
        });
    }
    categoryOptions.sort(function (a, b) {
        if (a.label < b.label) { return -1; }
        if (a.label > b.label) { return 1; }
        return 0;
    })

  const initData = {
    searchKey: '',
    category: [],
  }
  const [dataForm, setDataForm] = useState(initData)

  const handleCategory = (value) => {
    setDataForm({ ...dataForm, category: value })
  }
  const handleKeyword = (e) => {
    setDataForm({ ...dataForm, searchKey: e.target.value })
  }

  const handleSearch = async () => {
    SearchAPI.SearchProphecy(dataForm, setProphecies)
  }

  return (
    <div className="searchBar">
      <TreeSelect
        showSearch
        dropdownStyle={{
          minWidth: 200,
          maxHeight: 400,
          overflow: 'auto',
        }}
        style={{ width: '100%' }}
        placeholder="Search Category"
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={handleCategory}
        treeData={categoryOptions}
      />

      <Input
        style={{ width: '100%' }}
        onChange={handleKeyword}
        placeholder="Search Keyword in Title Only!"
        allowClear
      />

      <Button
        className="filterBtn"
        onClick={handleSearch}
        icon={<SearchOutlined />}>
        Search
      </Button>
    </div>
  )
}

export default SearchBar
