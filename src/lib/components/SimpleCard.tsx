
function SimpleCard(
    { 
        children = null 
    } : { 
        children: React.ReactNode | null 
    }
) {
    return (
        <div id="simple-card">
            <div className="p-5 border">
                {children}
            </div>
        </div>
    )
}

export default SimpleCard;