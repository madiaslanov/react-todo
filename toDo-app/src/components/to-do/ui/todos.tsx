
interface TodosProps{
    id: string;
    addedDate: number;
    order: number;
    title: string;
}

const Todos:React.FC<TodosProps> = () => {
    return (
        <div>
            hello
        </div>
    )
}

export default Todos;