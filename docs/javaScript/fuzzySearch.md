## 树结构数据模糊查找并返回所有符合条件节点及其父节点

### 在 el-select 下拉框中使用 el-tree 组件 并实现模糊搜索

**结构如下**

![](/javascript/fuzzySearch/3.png)

**如下是 html 模板 其中 treeList 为 res.data 在本页的末尾**

![](/javascript/fuzzySearch/2.png)

**第一个 el-tree 是全部数据 第二个 tree 是搜索后的数据**

```js
export default {
  data() {
    return {
      fuzzyquery: false, //通过该数据控制tree的显示隐藏
    };
  },
  methods: {
    onfocus() {
      //获取焦点时触发 渲染第一个tree 即渲染全部数据
      this.fuzzyquery = false;
    },
    filterMethod(val) {
      //自定义搜索方法
      if (val === "") {
        //输入框中没有值 渲染第一个tree
        this.fuzzyquery = false;
      } else {
        this.fuzzyquery = true; // 渲染第二个tree
        //设置第二个tree的数据 第一个参数为整个树形数据
        this.treeSearchList = this.fuzzyQuery(this.treeList, val);
      }
    },
    fuzzyQuery(list, keyWord) {
      // 根据输入框的值筛选tree数据 使用递归 该函数返回一个新数组
      let newTree = [];
      list.forEach((element) => {
        if (element.children && element.children.length > 0) {
          // 对当前元素的children进行递归 将返回的数组存放
          const ab = this.fuzzyQuery(element.children, keyWord);
          const obj = {
            // 替换当前元素的children
            ...element,
            children: ab,
          };
          if (ab && ab.length) {
            // 当搜索到的 元素的children 不为空时 将对象push到新数组
            newTree.push(obj);
          }
        } else {
          // 元素没有children再判断
          if (element.name.indexOf(keyWord) > -1) {
            // 模糊搜索 将搜索到的元素push到新数组中
            newTree.push(element);
          }
        }
      });
      return newTree;
    },
  },
};
```

**效果如图**

![](/javascript/fuzzySearch/4.png)
![](/javascript/fuzzySearch/5.png)

**从后端返回数据如下**

```json
{
  "respCode": "0",
  "data": [
    {
      "id": "8bdb803e-3cc7-4d39-b13c-36ca974e2bab",
      "parentId": null,
      "name": "资料中心",
      "sort": "0",
      "children": [
        {
          "id": "0c653e2f-8225-42ee-b66a-b3dfec8d3b86",
          "parentId": "8bdb803e-3cc7-4d39-b13c-36ca974e2bab",
          "name": "标准法规资料",
          "sort": "1",
          "children": [
            {
              "id": "8cb6ba27-e24e-41b1-b72f-62e9d9b447d3",
              "parentId": "0c653e2f-8225-42ee-b66a-b3dfec8d3b86",
              "name": "标准新闻",
              "sort": "1",
              "children": []
            },
            {
              "id": "b4186ebb-8fd4-4657-b1aa-7a630829c15b",
              "parentId": "0c653e2f-8225-42ee-b66a-b3dfec8d3b86",
              "name": "标准公告",
              "sort": "2",
              "children": [
                {
                  "id": "51eae65f-baf5-4f28-98da-bf8fbde6b755",
                  "parentId": "b4186ebb-8fd4-4657-b1aa-7a630829c15b",
                  "name": "标准公告",
                  "sort": "1",
                  "children": []
                },
                {
                  "id": "355fd946-19e5-4f49-b7d6-99359cc583e8",
                  "parentId": "b4186ebb-8fd4-4657-b1aa-7a630829c15b",
                  "name": "标准化信息",
                  "sort": "3",
                  "children": []
                },
                {
                  "id": "4877a1aa-5109-4837-a856-e0c8a156f6ed",
                  "parentId": "b4186ebb-8fd4-4657-b1aa-7a630829c15b",
                  "name": "企业标准发布通知",
                  "sort": "3",
                  "children": []
                }
              ]
            },
            {
              "id": "77d5e12c-7096-40eb-af48-ce87143e617d",
              "parentId": "0c653e2f-8225-42ee-b66a-b3dfec8d3b86",
              "name": "常用资料",
              "sort": "3",
              "children": [
                {
                  "id": "9a6345cc-2a8f-4b6f-b2df-869770e2847c",
                  "parentId": "77d5e12c-7096-40eb-af48-ce87143e617d",
                  "name": "模板",
                  "sort": "1",
                  "children": []
                },
                {
                  "id": "b589a1c2-9641-450d-9a4d-3c07a49609e6",
                  "parentId": "77d5e12c-7096-40eb-af48-ce87143e617d",
                  "name": "法规/法规/管理办法",
                  "sort": "2",
                  "children": []
                },
                {
                  "id": "e034eadc-b30a-49c8-80bd-4a88dede189c",
                  "parentId": "77d5e12c-7096-40eb-af48-ce87143e617d",
                  "name": "标准体系框架",
                  "sort": "3",
                  "children": []
                },
                {
                  "id": "e5b897c8-f48f-4349-b325-6a0d6cfd5169",
                  "parentId": "77d5e12c-7096-40eb-af48-ce87143e617d",
                  "name": "汽车标准件",
                  "sort": "4",
                  "children": [
                    {
                      "id": "3b2492cf-3d5e-4bcc-b4f8-710094297268",
                      "parentId": "e5b897c8-f48f-4349-b325-6a0d6cfd5169",
                      "name": "汽车标准件手册",
                      "sort": "1",
                      "children": []
                    },
                    {
                      "id": "9416501c-6a01-4f21-bf3f-890eea2caf74",
                      "parentId": "e5b897c8-f48f-4349-b325-6a0d6cfd5169",
                      "name": "福田汽车标准件手册",
                      "sort": "2",
                      "children": []
                    },
                    {
                      "id": "3a8b61cc-7cf1-478c-a849-79b75d116ac5",
                      "parentId": "e5b897c8-f48f-4349-b325-6a0d6cfd5169",
                      "name": "汽车标准件调研资料",
                      "sort": "3",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "0c1becef-aefa-469d-b7e3-90f26a5d3852",
                  "parentId": "77d5e12c-7096-40eb-af48-ce87143e617d",
                  "name": "福田汽车新能源汽车试验手册",
                  "sort": "5",
                  "children": []
                }
              ]
            },
            {
              "id": "6576874e-53d5-432a-b3d1-82a072c1d339",
              "parentId": "0c653e2f-8225-42ee-b66a-b3dfec8d3b86",
              "name": "会议培训/信息",
              "sort": "5",
              "children": []
            },
            {
              "id": "efb0f7e1-aacc-4ad0-bac8-6968d4e4a827",
              "parentId": "0c653e2f-8225-42ee-b66a-b3dfec8d3b86",
              "name": "标准法规目录",
              "sort": "5",
              "children": [
                {
                  "id": "bdad3fae-fa9a-4008-abef-6842a16bbd9f",
                  "parentId": "efb0f7e1-aacc-4ad0-bac8-6968d4e4a827",
                  "name": "外部标准目录",
                  "sort": "1",
                  "children": []
                },
                {
                  "id": "63b25687-3bab-4b07-9d9b-b7bf08a23512",
                  "parentId": "efb0f7e1-aacc-4ad0-bac8-6968d4e4a827",
                  "name": "内部标准目录",
                  "sort": "2",
                  "children": []
                }
              ]
            },
            {
              "id": "9257bd05-5cc2-48d0-9bbc-c606d933bef9",
              "parentId": "0c653e2f-8225-42ee-b66a-b3dfec8d3b86",
              "name": "标准法规分析报告",
              "sort": "7",
              "children": []
            },
            {
              "id": "a03963c3-81c2-4f30-99d7-61f336a9f747",
              "parentId": "0c653e2f-8225-42ee-b66a-b3dfec8d3b86",
              "name": "历史资料",
              "sort": "10",
              "children": [
                {
                  "id": "68cdcc14-621e-4c83-bed9-c3ac3d169563",
                  "parentId": "a03963c3-81c2-4f30-99d7-61f336a9f747",
                  "name": "标准新闻",
                  "sort": "1",
                  "children": []
                },
                {
                  "id": "03e556e4-35b5-47e0-81a2-26463516a25b",
                  "parentId": "a03963c3-81c2-4f30-99d7-61f336a9f747",
                  "name": "标准公告",
                  "sort": "2",
                  "children": []
                },
                {
                  "id": "670de4c0-13a3-44da-bbdd-303039d7a8a6",
                  "parentId": "a03963c3-81c2-4f30-99d7-61f336a9f747",
                  "name": "常用资料",
                  "sort": "3",
                  "children": []
                },
                {
                  "id": "c723554f-f1f6-4c65-9385-39aec40eda02",
                  "parentId": "a03963c3-81c2-4f30-99d7-61f336a9f747",
                  "name": "标准法规目录",
                  "sort": "4",
                  "children": []
                },
                {
                  "id": "1e331bcd-f91c-4589-9f7e-9f1f398b4883",
                  "parentId": "a03963c3-81c2-4f30-99d7-61f336a9f747",
                  "name": "标准法规分析报告",
                  "sort": "5",
                  "children": []
                },
                {
                  "id": "0c5f335a-6f89-416d-a6f6-b7b30e0e881f",
                  "parentId": "a03963c3-81c2-4f30-99d7-61f336a9f747",
                  "name": "标准法规符合性检查报告",
                  "sort": "6",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "6218241d-06b4-4474-8e31-2cb64815ec50",
          "parentId": "8bdb803e-3cc7-4d39-b13c-36ca974e2bab",
          "name": "政策法规资料",
          "sort": "1",
          "children": []
        }
      ]
    }
  ],
  "ok": true,
  "message": ""
}
```
