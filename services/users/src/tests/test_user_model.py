def test_passwords_are_random(test_app, test_database, add_user):
    """
        Make two users with the same password and verify
        that the encrypted passwords are different.
    """
    user_one = add_user('justatest', 'test@test.com', 'greaterthaneight')
    user_two = add_user('justatest2', 'test@test2.com', 'greaterthaneight')
    assert user_one.password != user_two.password