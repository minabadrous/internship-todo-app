function ActivityStatus({ getOption }) {
    return (<div id='statusWrapper'>
        <select name="todoStatus" id="todoStatus" onChange={getOption}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="done">Done</option>
        </select>
    </div>)
}



export default ActivityStatus;