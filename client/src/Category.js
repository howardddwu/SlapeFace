function importAll(r) {
    let images = {};

    let t1 = {}, t2={}, t3={};
    r.keys().forEach((item, index) => { t1[item.replace('./', '')] = r(item);});
    Object.keys(t1).forEach((item, index) => { t2[item.replace('.png', '')] = t1[item];});
    Object.keys(t2).forEach((item, index) => { t3[item.replace('.jpg', '')] = t2[item];});
    Object.keys(t3).forEach((item, index) => { images[item.replace('.webp', '')] = t3[item];});
    return images
}
const images = importAll(require.context('./components/BeginnerGuidance/data', false, /\.(png|jpe?g|svg|webp)$/));


export const categoryList = [
    "News and Events",
    "Entertainment",
    "Sports",
    "Fashion and Style",
    "Travel",
    "Food and Cooking",
    "Health and Fitness",
    "Technology and Gadgets",
    "Business and Finance",
    "Politics and Government",
    "Art and Culture",
    "Education",
    "Science and Nature",
    "Gaming",
    "Humor and Memes",
    "Relationships and Dating",
    "Parenting and Family",
    "Personal Development and Self-lmprovement",
    "Religion and Spirituality",
    "Environmental lssues"
];




export const topics = [
    { name: "News and Events", image: images.News_and_Events },
    { name: "Entertainment", image: images.Entertainment },
    { name: "Sports", image: images.Sports },
    { name: "Fashion and Style", image: images.Fashion_and_Style },
    { name: "Travel", image: images.Travel },
    { name: "Food and Cooking", image: images.Food_and_Cooking },
    { name: "Health and Fitness", image: images.Health_and_Fitness },
    { name: "Technology and Gadgets", image: images.Technology_and_Gadgets },
    { name: "Business and Finance", image: images.Business_and_Finance },
    { name: "Politics and Government", image: images.Politics_and_Government },
    { name: "Art and Culture", image: images.Art_and_Culture },
    { name: "Education", image: images.Education },
    { name: "Science and Nature", image: images.Science_and_Nature },
    { name: "Gaming", image: images.Gaming },
    { name: "Humor and Memes", image: images.Humor_and_Memes },
    { name: "Relationships and Dating", image: images.Relationships_and_Dating },
    { name: "Parenting and Family", image: images.Parenting_and_Family },
    { name: "Personal Development and Self-lmprovement", image: images.Personal_Development_and_Selflmprovement },
    { name: "Religion and Spirituality", image: images.Religion_and_Spirituality },
    { name: "Environmental lssues", image: images.Environmental_lssues },
];



export const treeData = [
    {
        value: 'News and Events', title: 'News and Events',
        children: [
            { value: 'Politics', title: 'Politics', },
            { value: 'World News', title: 'World News', },
            { value: 'Local News', title: 'Local News', },
            { value: 'Breaking News', title: 'Breaking News', },
            { value: 'Science and Technology News', title: 'Science and Technology News', }
        ],
    },

    {
        value: 'Entertainment', title: 'Entertainment',
        children: [
            { value: 'Movies', title: 'Movies', },
            { value: 'TV Shows', title: 'TV Shows', },
            { value: 'Music', title: 'Music', },
            { value: 'Celebrities', title: 'Celebrities', },
        ],
    },

    {
        value: 'Sports', title: 'Sports',
        children: [
            { value: 'Football (Soccer)', title: 'Football (Soccer)', },
            { value: 'Basketball', title: 'Basketball', },
            { value: 'Baseball', title: 'Baseball', },
            { value: 'American Football', title: 'American Football', },
            { value: 'Tennis', title: 'Tennis', }
        ],
    },

    {
        value: 'Fashion and Style', title: 'Fashion and Style',
        children: [
            { value: 'Fashion Trends', title: 'Fashion Trends', },
            { value: 'Makeup', title: 'Makeup', },
            { value: 'Hair', title: 'Hair', },
            { value: 'Accessories', title: 'Accessories', },
            { value: 'Shoes', title: 'Shoes', }
        ],
    },

    {
        value: 'Travel', title: 'Travel',
        children: [
            { value: 'Destinations', title: 'Destinations', },
            { value: 'Budget Travel', title: 'Budget Travel', },
            { value: 'Luxury Travel', title: 'Luxury Travel', },
            { value: 'Adventure Travel', title: 'Adventure Travel', },
            { value: 'Food and Drink', title: 'Food and Drink', }
        ],
    },

    {
        value: 'Food and Cooking', title: 'Food and Cooking',
        children: [
            { value: 'Recipes', title: 'Recipes', },
            { value: 'Healthy Eating', title: 'BaskeHealthy Eatingtball', },
            { value: 'Desserts and Baking', title: 'Desserts and Baking', },
            { value: 'Vegetarian and Vegan', title: 'Vegetarian and Vegan', },
            { value: 'Food Photography', title: 'Food Photography', }
        ],
    },

    {
        value: 'Health and Fitness', title: 'Health and Fitness',
        children: [
            { value: 'Workout Tips', title: 'Workout Tips', },
            { value: 'Yoga and Meditation', title: 'Yoga and Meditation', },
            { value: 'Nutrition', title: 'Nutrition', },
            { value: 'Mental Health', title: 'Mental Health', },
            { value: 'Weight Loss', title: 'Weight Loss', }
        ],
    },

    {
        value: 'Technology and Gadgets', title: 'Technology and Gadgets',
        children: [
            { value: 'Smartphones', title: 'Smartphones', },
            { value: 'Computers and Laptops', title: 'Computers and Laptops', },
            { value: 'Gaming Consoles', title: 'Gaming Consoles', },
            { value: 'Wearable Technology', title: 'Wearable Technology', },
            { value: 'Artificial Intelligence', title: 'Artificial Intelligence', }
        ],
    },

    {
        value: 'Business and Finance', title: 'Business and Finance',
        children: [
            { value: 'Entrepreneurship', title: 'Entrepreneurship', },
            { value: 'Investing', title: 'Investing', },
            { value: 'Personal Finance', title: 'Personal Finance', },
            { value: 'Startups', title: 'Startups', },
            { value: 'Marketing', title: 'Marketing', }
        ],
    },

    {
        value: 'Politics and Government', title: 'Politics and Government',
        children: [
            { value: 'Political Parties', title: 'Political Parties', },
            { value: 'Elections', title: 'Elections', },
            { value: 'Government Policies', title: 'Government Policies', },
            { value: 'International Relations', title: 'International Relations', },
            { value: 'Civic Engagement', title: 'Civic Engagement', }
        ],
    },

    {
        value: 'Art and Culture', title: 'Art and Culture',
        children: [
            { value: 'Painting and Drawing', title: 'Painting and Drawing', },
            { value: 'Sculpture', title: 'Sculpture', },
            { value: 'Photography', title: 'Photography', },
            { value: 'Film', title: 'Film', },
            { value: 'Literature', title: 'Literature', }
        ],
    },

    {
        value: 'Education', title: 'Education',
        children: [
            { value: 'Online Learning', title: 'Online Learning', },
            { value: 'Study Tips', title: 'Study Tips', },
            { value: 'College and University', title: 'College and University', },
            { value: 'Homeschooling', title: 'Homeschooling', },
            { value: 'Early Childhood Education', title: 'Early Childhood Education', }
        ],
    },

    {
        value: 'Science and Nature', title: 'Science and Nature',
        children: [
            { value: 'Astronomy', title: 'Astronomy', },
            { value: 'Biology', title: 'Biology', },
            { value: 'Earth Science', title: 'Earth Science', },
            { value: 'Physics', title: 'Physics', },
        ],
    },

    {
        value: 'Gaming', title: 'Gaming',
        children: [
            { value: 'Console Games', title: 'Console Games', },
            { value: 'PC Games', title: 'PC Games', },
            { value: 'Mobile Games', title: 'Mobile Games', },
            { value: 'Esports', title: 'Esports', },
            { value: 'Game Reviews', title: 'Game Reviews', }
        ],
    },

    {
        value: 'Humor and Memes', title: 'Humor and Memes',
        children: [
            { value: 'Memes and Viral Content', title: 'Memes and Viral Content', },
            { value: 'Stand-Up Comedy', title: 'Stand-Up Comedy', },
            { value: 'Funny Videos', title: 'Funny Videos', },
            { value: 'Satirical News', title: 'Satirical News', },
            { value: 'Pranks', title: 'Pranks', }
        ],
    },

    {
        value: 'Relationships and Dating', title: 'Relationships and Dating',
        children: [
            { value: 'Marriage and Long-Term Relationships', title: 'Marriage and Long-Term Relationships', },
            { value: 'Online Dating', title: 'Online Dating', },
            { value: 'LGBTQ+ Relationships', title: 'LGBTQ+ Relationships', },
            { value: 'Single Life', title: 'Single Life', },
            { value: 'Breakups and Divorce', title: 'Breakups and Divorce', }
        ],
    },

    {
        value: 'Parenting and Family', title: 'Parenting and Family',
        children: [
            { value: 'Pregnancy and Childbirth', title: 'Pregnancy and Childbirth', },
            { value: 'Child Development', title: 'Child Development', },
            { value: 'Parenting Advice', title: 'Parenting Advice', },
            { value: 'Blended Families', title: 'Blended Families', },
            { value: 'Adoption', title: 'Adoption', }
        ],
    },

    {
        value: 'Personal Development and Self-mprovement', title: 'Personal Development and Self-mprovement',
        children: [
            { value: 'Mindfulness and Meditation', title: 'Mindfulness and Meditation', },
            { value: 'Time Management', title: 'Time Management', },
            { value: 'Productivity', title: 'Productivity', },
            { value: 'Goal Setting', title: 'Goal Setting', },
            { value: 'Career Development', title: 'Career Development', }
        ],
    },

    {
        value: 'Religion and Spirituality', title: 'Religion and Spirituality',
        children: [
            { value: 'Christianity', title: 'Christianity', },
            { value: 'Islam', title: 'Islam', },
            { value: 'Buddhism', title: 'Buddhism', },
            { value: 'Hinduism', title: 'Hinduism', },
            { value: 'New Age Spirituality', title: 'New Age Spirituality', }
        ],
    },

    {
        value: ' Environmental lssues', title: ' Environmental lssues',
        children: [
            { value: 'Climate Change', title: 'Climate Change', },
            { value: 'Conservation', title: 'Conservation', },
            { value: 'Renewable Energy', title: 'Renewable Energy', },
            { value: 'Eco-Friendly Living', title: 'Eco-Friendly Living', },
            { value: 'Pollution Control', title: 'Pollution Control', }
        ],
    },
];