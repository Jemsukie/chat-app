const ChatWithUser = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col">
        Search Contact
        <div className="form-control">
          <label className="input-group">
            <input
              type="text"
              className="input-bordered input"
              name="searchTerm"
            />
            <button className="btn-primary btn">Search</button>
          </label>
        </div>
      </div>
    </div>
  )
}

export default ChatWithUser
