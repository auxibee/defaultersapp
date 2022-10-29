from application.models import User
def test_new_user_with_fixture(new_user : User):
    """
    GIVEN a User Model
    WHEN a new User is created
    THEN check the username,password fields are defined correctly

    """
    assert new_user.username == "auxibee"
    assert new_user.password != "123456"
