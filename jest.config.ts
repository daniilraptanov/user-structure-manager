module.exports = {
    "moduleDirectories": ["node_modules", "<rootDir>"],
    "verbose": true,
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js"
    ],
    "globals": {
        "ts-jest": {
            "tsConfig": "tsconfig.json"
        }
    },
    "testTimeout": 30000
}

