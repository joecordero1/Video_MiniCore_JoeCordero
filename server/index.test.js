// Test case 1: Check if notes_db is an array
test('notes_db should be an array', () => {
    expect(Array.isArray(notes_db)).toBe(true);
});

// Test case 2: Check if notes_db contains the correct number of elements
test('notes_db should contain 48 elements', () => {
    expect(notes_db.length).toBe(48);
});

// Test case 3: Check if each element in notes_db is an instance of Note class
test('Each element in notes_db should be an instance of Note class', () => {
    notes_db.forEach((note) => {
        expect(note instanceof Note).toBe(true);
    });
});

// Test case 4: Check if notes_db contains the correct data
test('notes_db should contain the correct data', () => {
    const expectedData = [
        { studentId: 17072, grade: 10, date: '2024-01-15' },
        { studentId: 17072, grade: 10, date: '2024-02-20' },
        // ... (add the rest of the expected data here)
    ];

    expect(notes_db).toEqual(expectedData);
});