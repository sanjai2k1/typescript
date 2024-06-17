import ListItem from "./Listitem";

interface List{
    list: ListItem[]
    load():void,
    save():void,
    clearlist():void,
    addItem(itemObj:ListItem):void,
    removeItem(id:string):void,
    updateItem(id:string,data:any):void
}

export default class FullList implements List{
    static instance: FullList = new FullList()

    constructor(private _list :ListItem[]=[]){}

    get list():ListItem[]{return this._list}
    set list(list:ListItem[]){this._list=list}


    load():void{
        const storedList: string | null =localStorage.getItem("myList")

        if(typeof storedList !== "string") return

        const parsedList : {_id:string,_item :string ,_checked:boolean}[]= JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id,itemObj._item,itemObj._checked)
            FullList.instance.addItem(newListItem)
        })

    }

    save():void{
        localStorage.setItem("myList",JSON.stringify(this._list))
    }

    clearlist(): void {
        this._list=[]
        this.save()
    }
    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
        
    }

    removeItem(id: string): void {
        this._list=this._list.filter(item=>item.id !== id)
        this.save()
    }

    updateItem(id: string, data: any) {
        let index = this._list.findIndex(item=>item.id===id)
        this._list[index]=data
        this.save()
    }

}