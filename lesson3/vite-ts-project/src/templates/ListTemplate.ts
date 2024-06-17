import FullList from "../model/FullList";


interface DOMList{
    ul:HTMLUListElement,
    clear():void,
    render(fullList:FullList):void
}

export default class ListTemplate implements DOMList{

    static instance : ListTemplate = new ListTemplate() //singleton
    ul:HTMLUListElement
    constructor(){
        this.ul=document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML=""
    }
    render(fullList: FullList): void {
        this.clear()

        fullList.list.forEach(item=>{

            const li = document.createElement("li") as HTMLLIElement
            li.className="item"

            const check = document.createElement("input") as HTMLInputElement

            check.type="checkbox"
            check.id=item.id
            check.tabIndex=0
            check.checked = item.checked

            li.append(check)

            check.addEventListener('change',()=>{
                item.checked =!item.checked
                fullList.save()
            })

            if(!item.edit){

            const label = document.createElement("label") as HTMLLabelElement

            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)
            }else{

                const label = document.createElement("Input") as HTMLInputElement

                label.value = item.item
                

                li.append(label)

                label.addEventListener('change',()=>{
                    item.item=label.value
                    
                })
            }

            const updateButton = document.createElement("button") as HTMLButtonElement
            updateButton.className='button'
            updateButton.textContent='Edit'
            li.append(updateButton)

            updateButton.addEventListener('click',()=>{
                item.edit=!item.edit
                this.render(fullList)
            })

            const button = document.createElement("button") as HTMLButtonElement

            button.className='button'
            button.textContent = 'X'
            li.append(button)

            button.addEventListener('click',()=>{
                fullList.removeItem(item.id)
                this.render(fullList)
            })
            this.ul.append(li)
        })
    }

}

