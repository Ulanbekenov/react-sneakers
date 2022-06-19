import Card from "../components/Card";

function Favorites({
    favoriteItems,
    onAddFavorite
}) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои Закладки</h1>
            </div>

            <div className="d-flex flex-wrap">
                {favoriteItems
                    .map((item, index) => {
                        return <Card
                            key={index}
                            inFavorite={true}
                            onFavorite={onAddFavorite}
                            {...item}

                        />
                    })}
            </div>
        </div>
    )
}

export default Favorites; 