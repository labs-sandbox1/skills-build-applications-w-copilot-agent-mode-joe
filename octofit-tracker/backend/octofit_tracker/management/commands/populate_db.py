from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='marvel')
        dc = Team.objects.create(name='dc')

        # Users
        ironman = User.objects.create(email='ironman@marvel.com', name='Iron Man', team='marvel')
        captain = User.objects.create(email='captain@marvel.com', name='Captain America', team='marvel')
        batman = User.objects.create(email='batman@dc.com', name='Batman', team='dc')
        superman = User.objects.create(email='superman@dc.com', name='Superman', team='dc')

        # Activities
        Activity.objects.create(user='Iron Man', type='run', duration=30, date='2025-11-26')
        Activity.objects.create(user='Captain America', type='cycle', duration=45, date='2025-11-25')
        Activity.objects.create(user='Batman', type='swim', duration=60, date='2025-11-24')
        Activity.objects.create(user='Superman', type='fly', duration=120, date='2025-11-23')

        # Leaderboard
        Leaderboard.objects.create(team='marvel', points=75)
        Leaderboard.objects.create(team='dc', points=90)

        # Workouts
        Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='easy')
        Workout.objects.create(name='Sprints', description='Sprint for 100m', difficulty='medium')
        Workout.objects.create(name='Deadlift', description='Deadlift 100kg', difficulty='hard')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
