module.exports = {
	apps: [
		{
			name: "IDSOLUTIONS", // PROJECT-NAME
			script: "./projects/server/src/index.js",
			env: {
				NODE_ENV: "production",
				PORT: 8000,
			},
			time: true,
		},
	],
};
